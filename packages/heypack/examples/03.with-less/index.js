import './index.css';
import './lib.less';

const foo = () => {
  console.log('foo');
};

foo();

const container = document.createElement('div');
container.innerHTML = 'Hello, I am Heypack!';
document.body.appendChild(container);
