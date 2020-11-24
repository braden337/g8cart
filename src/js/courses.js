import '../css/normalize.css';
import '../css/style.css';

class Course {
  constructor(id, price, instructor, availableSpaces, title, description, image) {
    this.id = id;
    this.price = price;
    this.instructor = instructor;
    this.availableSpaces = availableSpaces;
    this.title = title;
    this.description = description;
    this.image = image;
  }
}

const cartEle = document.querySelector('.popover');
const coursesEle = document.querySelector('.courses');

cartEle.addEventListener('click', function () {
  document.querySelector('.cart-inner').classList.toggle('hide');
});

const courses = [
  new Course(
    'SD100',
    154.99,
    'Chris MacDonald',
    15,
    'Introduction to Web Development',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'html_and_css.jpg'
  ),
  new Course(
    'SD110',
    223.01,
    'Chris MacDonald',
    3,
    'JavaScript Basics',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'js-basics.png'
  ),
  new Course(
    'SD120',
    99.99,
    'Chris MacDonald',
    10,
    'Object Oriented JavaScript',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'advanced-javascript.png'
  ),
  new Course(
    'SD145',
    49.99,
    'Chris MacDonald',
    30,
    'JavaScript Testing',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'testing.png'
  ),
  new Course(
    'SD260',
    149.99,
    'Chris MacDonald',
    5,
    'Introduction to React',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'react.jpg'
  ),
  new Course(
    'SD130',
    149.99,
    'Chris MacDonald',
    15,
    'Tools and Automation',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'tools.png'
  ),
];

function updateCourses() {
  coursesEle.innerHTML = '';
  courses.forEach(function (course) {
    coursesEle.insertAdjacentHTML(
      'afterbegin',
      `
      <li data-course-id="${course.id}">
        <img src="images/${course.image}">
        <div class="info">
          <h3 id="item-title">${course.title}</h3>
          <p id="item-description">
            ${course.description}
          </p>
          <div id="price">
            <h4>Price:</h4> 
            <span>$${course.price}</span>
          </div>
          <div id="instructor">
            <h4>Instructor</h4>
            <span>${course.instructor}</span>
          </div>
          <button id="add-to-cart">Add To Cart</button>
          <div id="spaces-remaining"><span>${course.availableSpaces}</span> spaces remaining</div>
        </div>
      </li>`
    );
  });
}

class Cart {
  constructor() {
    this.courses = [];
    this.length = 0;
  }

  addCourse(id) {
    let course = courses.find(function (course) {
      return course.id === id;
    });
    if (course.availableSpaces > 0) {
      course.availableSpaces--;
      this.courses.push(course);
      this.updateCart();
      updateCourses();
    }
  }

  removeCourse(itemNumber) {
    let course = this.courses.splice(itemNumber, 1).pop();
    course.availableSpaces++;
    this.updateCart();
    updateCourses();
  }

  subTotal() {
    let sum = 0;
    this.courses.forEach(course => {
      sum += course.price;
    });
    return sum.toFixed(2);
  }

  total() {
    return (this.subTotal() * 1.13).toFixed(2);
  }

  updateCart() {
    let ul = document.querySelector('#cart ul');
    ul.innerHTML = '';

    let summary = ul.previousElementSibling;
    summary.innerHTML = `You have ${this.courses.length} Items in your cart.`;

    let subTotal = ul.nextElementSibling.querySelector('#subtotal-amount');
    subTotal.innerHTML = `$${this.subTotal()}`;

    let total = subTotal.parentElement.nextElementSibling.querySelector('#total-amount');
    total.innerHTML = `$${this.total()}`;

    this.courses.forEach((course, index) => {
      ul.innerHTML += `
      <li data-item-no="${index}"
      data-course-id="${course.id}">
    <img src="images/${course.image}">  
    <div id="cart-title">${course.title}</div>
    <div id="cart-price">$${course.price}</div>
    <div id="delete">
      <i class="far fa-times-circle"></i>
    </div>
    </li>`;
    });
  }
}

let cart = new Cart();
let ul = document.querySelector('ul.courses');
ul.addEventListener('click', function (event) {
  let id = event.target.closest('li').dataset.courseId;
  cart.addCourse(id);
});
let cartList = document.querySelector('#cart ul');
cartList.addEventListener('click', function (event) {
  let li = event.target.closest('li');
  let itemNumber = li.dataset.itemNo;
  cart.removeCourse(itemNumber);
});
updateCourses();
