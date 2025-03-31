const express = require("express");
const router = express.Router();
const pool = require("../db"); 


router.get("/quizzes", async (req, res) => {
  try {
    const [quizzes] = await pool.query("SELECT * FROM Quiz"); 
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching quizzes" });
  }
});

router.get("/quizzes/teacher/:id", async (req,res) => {
  try {
    const teacherName  = await pool.query("SELECT name FROM teacher WHERE quiz_id = ?", [req.params.id])
    res.json(teacherName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching quizzes" });
  }
})

router.get("/quizzes/given/:student_id", async(req,res) => {
  try {
    const quiz_id = await pool.query("SELECT DISTINCT quiz_id FROM studentquiz WHERE student_id = ?", [req.params.student_id]);
    res.json({quiz_id});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching quizzes" });
  }
});


router.get("/quizzes/:id", async (req, res) => {
  try {
    const quizId = req.params.id;
 
    const [quiz] = await pool.query("SELECT * FROM quiz WHERE id = ?", [quizId]);

    if (quiz.length === 0) {
      return res.status(404).json({ message: "Quiz not found" });
    }
 
    const [questions] = await pool.query(
      `SELECT q.id AS question_id, q.question_text, q.hardness_level, 
              qo.id AS option_id, qo.option_text, qo.is_correct 
       FROM question q 
       LEFT JOIN questionoption qo ON q.id = qo.question_id
       WHERE q.quiz_id = ?`,
      [quizId]
    );
 
    const questionMap = {};
    questions.forEach((row) => {
      if (!questionMap[row.question_id]) {
        questionMap[row.question_id] = {
          question_id: row.question_id,
          question_text: row.question_text,
          hardness_level: row.hardness_level,
          options: [],
        };
      }
      questionMap[row.question_id].options.push({
        option_id: row.option_id,
        option_text: row.option_text,
        is_correct: row.is_correct,
      });
    });

    const structuredQuestions = Object.values(questionMap);

    res.json({
      quiz: quiz[0],  
      questions: structuredQuestions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching quiz data" });
  }
});


router.post("/submit-quiz", async (req, res) => {
  const { student_id, quiz_id, answers } = req.body;

  if (!student_id || !quiz_id || !answers) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  
  try {
    let score = 0;
 
    for (const questionId in answers) {
      const selectedOptionId = answers[questionId];

      if (selectedOptionId !== null) {
        const [option] = await pool.query(
          "SELECT is_correct FROM questionoption WHERE id = ?",
          [selectedOptionId]
        );

        if (option && option[0].is_correct === 1) {
          score += 1;  
        }
      }
    }
 
    await pool.query(
      "INSERT INTO studentquiz (id, student_id, quiz_id, score) VALUES (UUID(), ?, ?, ?)",
      [student_id, quiz_id, score]
    );
 
    await pool.query(
      "UPDATE student SET marks = marks + ? WHERE id = ?",
      [score, student_id]
    );

    res.json({ message: "Quiz submitted successfully!", score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting quiz"});
  }
});

module.exports = router;
