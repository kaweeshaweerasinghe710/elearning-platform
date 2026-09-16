import { Plus, X } from 'lucide-react';
import QuizQuestionRow from './QuizQuestionRow';

const QuizzesSection = ({ quizzes, updateQuiz, removeQuiz, addQuiz }) => {
    const addQuestion = (qIdx) => {
        const newQuestions = [...(quizzes[qIdx].questions || []), { question: '', options: ['', '', '', ''], correctAnswer: 0 }];
        updateQuiz(qIdx, 'questions', newQuestions);
    };
    const updateQuestion = (qIdx, qtIdx, f, v) => {
        const newQuestions = [...quizzes[qIdx].questions];
        newQuestions[qtIdx] = { ...newQuestions[qtIdx], [f]: v };
        updateQuiz(qIdx, 'questions', newQuestions);
    };
    const removeQuestion = (qIdx, qtIdx) => {
        updateQuiz(qIdx, 'questions', quizzes[qIdx].questions.filter((_, i) => i !== qtIdx));
    };

    return (
        <div className="space-y-6">
            {quizzes.map((quiz, quizIdx) => (
                <div key={quizIdx} className="ce-quiz-card p-5 border border-slate-200 rounded-xl bg-white shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="ce-quiz-badge bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">Quiz {quizIdx + 1}</span>
                        <input type="text" value={quiz.title} onChange={(e) => updateQuiz(quizIdx, 'title', e.target.value)} placeholder="Quiz Title" className="form-input flex-1 font-semibold text-lg" />
                        <button type="button" onClick={() => removeQuiz(quizIdx)} className="ce-remove-btn" title="Remove Quiz"><X size={14} /></button>
                    </div>
                    <div className="space-y-4">
                        {quiz.questions.map((q, qIdx2) => (
                            <QuizQuestionRow key={qIdx2} question={q} qIdx={qIdx2} onUpdate={(f, v) => updateQuestion(quizIdx, qIdx2, f, v)} onRemove={() => removeQuestion(quizIdx, qIdx2)} />
                        ))}
                    </div>
                    <button type="button" onClick={() => addQuestion(quizIdx)} className="ce-add-btn mt-4"><Plus size={15} /> Add Question</button>
                </div>
            ))}
            <button type="button" onClick={addQuiz} className="ce-add-btn w-full justify-center py-4 text-base border-dashed border-2 bg-slate-50 hover:bg-slate-100"><Plus size={15} /> Add Quiz</button>
        </div>
    );
};

export default QuizzesSection;
