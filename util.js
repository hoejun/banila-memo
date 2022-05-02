//최초 및 새로고침
const myInit = () => {
  if (localStorage.getItem('now').length > 0) {
    document.getElementsByClassName('wrap')[0].innerHTML = localStorage.getItem('now');
  }
};

//드래그
const dragElement = (el) => {
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;

  el.style.zIndex = 1;

  pos3 = window.event.clientX;
  pos4 = window.event.clientY;
  if (el.childNodes[1]) {
    console.log(el.childNodes);
    // el.childNodes[1].onmousedown = dragMouseDown;
    el.childNodes[1].onmousemove = elementDrag;
    document.onmouseup = closeDragElement;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    el.onmousedown = dragMouseDown;
  }

  // function dragMouseDown(e) {
  //   e = e || window.event;
  //   // get the mouse cursor position at startup:
  //   pos3 = e.clientX;
  //   pos4 = e.clientY;
  //   // call a function whenever the cursor moves:
  //   document.onmousemove = elementDrag;
  //   document.onmouseup = closeDragElement;
  // }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    el.style.top = el.offsetTop - pos2 + 'px';
    el.style.left = el.offsetLeft - pos1 + 'px';
  }
  function closeDragElement() {
    console.log('!!');
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    el.childNodes[1].onmousemove = null;
  }
};

//마우스 이벤트
const onMouseDown = (e) => {
  const newMemo = document.getElementsByClassName('memo');
  const store = document.getElementsByClassName('wrap')[0].innerHTML;

  //왼쪽 버튼
  if (e.button === 0 || e.which === 1) {
    const memo = document.getElementsByClassName('memo');

    Object.keys(memo).forEach((key) => {
      memo[key].style['z-index'] = 0;
    });

    if (e.target.offsetParent.id.length > 0) {
      dragElement(e.target.offsetParent);
    } else {
      e.path[2].style['z-index'] = 1;
    }
  }

  //오른쪽 버튼
  if (e.button === 2 || e.which === 3) {
    const cloneDiv = newMemo[0].cloneNode(true);

    cloneDiv.id = 'memo_' + e.clientX;
    cloneDiv.style.top = e.clientY + 'px';
    cloneDiv.style.left = e.clientX + 'px';

    document.getElementsByClassName('wrap')[0].appendChild(cloneDiv);
  }
  try {
    localStorage.setItem('now', store);
  } catch (error) {
    console.log(error);
  }
};

//오른쪽 클릭 메뉴 X
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});
//클릭 이벤트
document.addEventListener('mousedown', onMouseDown);
