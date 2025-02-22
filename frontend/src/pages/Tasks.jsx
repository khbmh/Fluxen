import KanbanBoard from '../taskComp/KanbanBoard';

function Tasks() {
  return (
    <div>
      <h1 className='text-center text-3xl heading'>Tasks</h1>
      <div>
        <KanbanBoard />
      </div>
    </div>
  );
}

export default Tasks;
