import Chat from './Chat';
import Tool from './Tool';

const SuspendPanel = () => {
  return (
    <div className="fixed right-[2%] bottom-[5%] flex flex-col gap-5 z-10">
      <Tool />
      <Chat />
    </div>
  );
};

export default SuspendPanel;
