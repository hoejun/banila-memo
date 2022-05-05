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
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    el.childNodes[1].onmousemove = null;
  }
};

//마우스 이벤트
const onMouseDown = (e) => {
  // const newMemo = document.getElementsByClassName('memo');
  const newMemo = document.querySelector('.memo');
  const store = document.getElementsByClassName('wrap')[0].innerHTML;
  // const memoDiv = window.event.target.offsetParent.offsetParent.id;
  // const memoId = document.getElementById(memoDiv);
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
    if (e.target.className === 'btn_size') {
      resizeDiv(e.target.offsetParent.offsetParent.id);
    }
  }

  //오른쪽 버튼
  //엘리먼트가 하나도 없을때 오른쪽 클릭 이벤트에 대한 분기 처리 필요
  if (e.button === 2 || e.which === 3) {
    console.log('@@+');
    // const cloneDiv = newMemo[0].cloneNode(true);
    const cloneDiv = newMemo.cloneNode(true);

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

//삭제 이벤트
const delteDiv = () => {
  // const buttonDiv = document.getElementById("btn_close");
  document.addEventListener('click', (e) => {
    const div = e.path[2];

    if (e.target.id === 'btn_close') {
      div.remove();
    }
  });
};

//사이즈 조절
const resizeDiv = (_memoDiv) => {
  // const memoDiv = window.event.target.offsetParent.offsetParent.id;
  const memoDiv = _memoDiv;
  const memoId = document.getElementById(memoDiv);
  let x = 0;
  let y = 0;
  let isDragging = null;
  let rect = null;
  // memoId.addEventListener('mousedown', (e) => {
  console.log('@@');
  rect = window.event.path[1].childNodes[1].getBoundingClientRect();
  isDragging = true;
  originX = window.event.clientX;
  originY = window.event.clientY;
  // });
  document.addEventListener('mouseup', (e) => {
    isDragging = false;
  });
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      x = window.event.clientX - rect.left;
      y = window.event.clientY - rect.top;
      e.path[1].childNodes[1].style.width = x + 'px';
      e.path[1].childNodes[1].style.height = y + 'px';
    }
  });
};

//오른쪽 클릭 메뉴 X
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});
//클릭 이벤트
document.addEventListener('mousedown', onMouseDown);
