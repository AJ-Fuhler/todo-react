import { useState, useRef, useEffect } from 'react'
import '../styles/modal.css'
import { todoService } from '../services/todos'
import type { Todo, ModalProps } from '../types/index'


const Modal = ({ todo, isModalOpen, setModalOpen, refreshTodos, setSelectedTitle }: ModalProps) => {
  const [title, setTitle] = useState<string>("");
  const [day, setDay] = useState<string>('dy');
  const [month, setMonth] = useState<string>('mn');
  const [year, setYear] = useState<string>('dflt');
  const [description, setDescription] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(false);

  const reset = () => {
    setTitle('');
    setDay('dy');
    setMonth('mn');
    setYear('dflt');
    setDescription('');
    setCompleted(false);
  }

  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setModalOpen(false);
    reset();
  }

  useEffect(() => {
    if (!isModalOpen) return;

    if (todo) {
      setTitle(todo.title);
      setDay(todo.day);
      setMonth(todo.month);
      setYear(todo.year);
      setDescription(todo.description !== " " ? todo.description : '');
      setCompleted(todo.completed);
    }


    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }

    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isModalOpen, todo])


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!todo) {
      createNewTodo()
    } else {
      updateTodo();
    }
  }

  const updateTodo = async () => {
    if (!todo) return;

    if (!title.trim()) {
      alert("Todo needs a title!");
      return;
    }

    try {
      const payload: Todo = {title, day, month, year, description: description || " ", completed};
      await todoService.update(todo.id!, payload);

      closeModal();
      await refreshTodos();
    } catch (err) {
      console.error("Error occurred: ", err);
    }
  }

  const handleComplete = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (todo) {
      await todoService.update(todo.id!, {completed: true});
      await refreshTodos();
      closeModal();
    } else {
      alert("This cannot be done.\nIf you want to add this todo, click 'Save' instead.")
    }
  }

  const createNewTodo = async () => {
    if (!title.trim()) {
      alert("Todo needs a title!");
      return;
    }

    try {
      const payload: Todo = {title, day, month, year, description, completed};
      await todoService.create(payload);

      closeModal();
      await refreshTodos();
      setSelectedTitle("All Todos");
    } catch(err) {
      console.error("Error Occurred: ", err);
    }
  }


  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal-content">
        <div className="modal-header">
          <h3>New Todo</h3>
          <button
            type="button"
            onClick={closeModal}
            className="close-button"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <fieldset>
            <ul>
              <li>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Item 1"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </li>

              <li>
                <label>Due Date</label>
                <div className="date-selects">
                  <select value={day} onChange={(e) => setDay(e.target.value)}>
                    <option value="dy">Day</option>
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                    <option value="05">5</option>
                    <option value="06">6</option>
                    <option value="07">7</option>
                    <option value="08">8</option>
                    <option value="09">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    {month !== "02" && (
                      <>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                      </>
                    )}
                  </select>
                  /
                  <select value={month} onChange={(e) => setMonth(e.target.value)}>
                    <option value="mn">Month</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                  /
                  <select value={year} onChange={(e) => setYear(e.target.value)}>
                    <option value="dflt">Year</option>
                    <option>2026</option>
                    <option>2027</option>
                    <option>2028</option>
                    <option>2029</option>
                    <option>2030</option>
                    <option>2031</option>
                  </select>
                </div>
              </li>

              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={7}
                  placeholder="Description"
                />
              </li>

              <li className="modal-actions">
                <button type="submit" className="save-button">
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleComplete}
                  className="complete-button"
                >
                  Mark As Complete
                </button>
              </li>
            </ul>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default Modal