import { ThemeProvider } from './contexts/ThemeContext';
import { TodoAppProvider } from './contexts/TodoAppContext';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { Modal } from './components/Modal';

function App() {
  return (
    <ThemeProvider>
      <TodoAppProvider>
        <div className="app">
          <aside className="app__sidebar">
            <Sidebar />
          </aside>
          <main className="app__main">
            <MainContent />
          </main>
          <Modal />
        </div>
      </TodoAppProvider>
    </ThemeProvider>
  );
}

export default App;
