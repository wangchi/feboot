import './index.css';

const foo = () => {
  console.log('foo');
};

foo();

const container = document.createElement('div');
container.innerHTML = 'Hello, I am Heyapp!';
document.body.appendChild(container);
