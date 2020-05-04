import './style/style.scss';

export class C {
  private x = 10;
  getX = () => this.x;
}

const x = new C();

const tag = document.getElementsByTagName('h1')[0];
tag.textContent += `, x = ${x.getX()}`;
