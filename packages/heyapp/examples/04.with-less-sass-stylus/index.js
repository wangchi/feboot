import './index.css';
import './lib.less';
import './firstletter.scss';

const foo = () => {
  console.log('foo');
};

foo();

const container = document.createElement('div');
container.innerHTML = 'Hello, I am Heyapp!';
document.body.appendChild(container);
