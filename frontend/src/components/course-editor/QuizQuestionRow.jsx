import { X } from 'lucide-react';

const QuizQuestionRow = ({ question, qIdx, onUpdate, onRemove }) => (
    <div className="ce-quiz-question">
        <div className="flex items-center gap-2 mb-3">
            <span className="ce-question-badge">Q{qIdx + 1}</span>
            <input type="text" value={question.question} onChange={(e) => onUpdate('question', e.target.value)} placeholder="Enter question..." className="form-input flex-1" />
            <button type="button" onClick={onRemove} className="ce-remove-btn" title="Remove"><X size={14} /></button>
        </div>

        <div className="ce-options-grid">
            {(question.options || ['', '', '', '']).map((opt, oIdx) => (
                <div key={oIdx} className="ce-option-row">

                    <input type="radio" name={`q-${qIdx}-correct`} checked={question.correctAnswer === oIdx} onChange={() => onUpdate('correctAnswer', oIdx)} className="ce-option-radio" />

                    <input type="text" value={opt} onChange={(e) => {
                            const newOpts = [...(question.options || ['', '', '', ''])];
                            newOpts[oIdx] = e.target.value;
                            onUpdate('options', newOpts);
                        }} placeholder={`Option ${oIdx + 1}`} className={`form-input flex-1 text-sm ${question.correctAnswer === oIdx ? 'ce-option-correct' : ''}`} />
                        
                </div>
            ))}
        </div>
    </div>
);
export default QuizQuestionRow;
