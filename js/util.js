//최초 및 새로고침
const myInit = () => {
  if (localStorage.getItem('now').length > 0) {
    document.getElementsByClassName('wrap')[0].innerHTML = localStorage.getItem('now');
  }
};
//div태그 엘리먼트
const createTag = (top, left) => {
  let htmlStr = `
    <div id="memo" class="memo" style="top:${top}; left:${left};">
      <div class="header">
          <h1 class="blind">메모장</h1>
          <button class="btn_close"><span class="blind">닫기</span></button>
      </div>
      <div class="content">
        <div class="textarea" contenteditable="true" style="width:200px; height:100px;">
            메모 하십시오! 메모 하십시오!메모 하십시오!<br>
            메모 하십시오!<br>
            메모 하십시오!<br>
            메모 하십시오!<br>
            메모 하십시오!<br>
            메모 하십시오!<br>
            메모 하십시오!<br>
            메모 하십시오!<br>
        </div>
        <button class="btn_size"><span class="blind">메모장 크기 조절</span></button>
      </div>
    </div>
  `;

  return htmlStr;
};
//드래그
const dragDiv = (el) => {
  const headerDiv = el.childNodes[1];
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;

  el.style.zIndex = 1;

  pos3 = window.event.clientX;
  pos4 = window.event.clientY;

  headerDiv.onmousemove = elementMove;
  document.onmouseup = elementUp;

  function elementMove(e) {
    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    el.style.top = el.offsetTop - pos2 + 'px';
    el.style.left = el.offsetLeft - pos1 + 'px';
  }

  function elementUp() {
    document.onmouseup = null;
    headerDiv.onmousemove = null;
  }
};
//사이즈 조절
const resizeDiv = (memoDiv) => {
  const memoId = document.getElementById(memoDiv);
  let rect = window.event.path[1].childNodes[1].getBoundingClientRect();
  let x = 0;
  let y = 0;

  memoId.onmousemove = elementMove;
  document.onmouseup = elementUp;

  function elementMove(e) {
    x = window.event.clientX - parseInt(rect.left);
    y = window.event.clientY - parseInt(rect.top);

    if (e.path[1].querySelector('.memo')) {
      e.target.lastElementChild.querySelector('.textarea').style.width = x + 'px';
      e.target.lastElementChild.querySelector('.textarea').style.width = y + 'px';
    } else {
      e.path[1].querySelector('.textarea').style.width = x + 'px';
      e.path[1].querySelector('.textarea').style.height = y + 'px';
    }
  }

  function elementUp() {
    document.onmouseup = null;
    memoId.onmousemove = null;
  }
};
//삭제 이벤트
const delteDiv = () => {
  window.event.path[2].remove();
};
//오른쪽 클릭 이벤트 로직
const mouseLeftEvent = (e) => {
  const memo = document.getElementsByClassName('memo');

  Object.keys(memo).forEach((key) => {
    memo[key].style['z-index'] = 0;
  });

  if (e.target.className === 'header') {
    dragDiv(e.target.offsetParent);
  } else {
    e.path[2].style['z-index'] = 1;
  }
  if (e.target.className === 'btn_size') {
    resizeDiv(e.target.offsetParent.offsetParent.id);
  }
  if (e.target.className === 'btn_close') {
    delteDiv();
  }
};
//왼쪽 클릭 이벤트 로직
const mouseRightEvent = (e) => {
  const newMemo = document.querySelector('.memo');
  const list = document.querySelector('.wrap');

  if (newMemo !== null) {
    const cloneDiv = newMemo.cloneNode(true);
    cloneDiv.id = 'memo_' + e.clientX;
    cloneDiv.style.top = e.clientY + 'px';
    cloneDiv.style.left = e.clientX + 'px';

    // document.getElementsByClassName('wrap')[0].appendChild(cloneDiv);
    list.appendChild(cloneDiv);
  } else {
    const top = e.clientY + 'px';
    const left = e.clientX + 'px';

    list.innerHTML = createTag(top, left);
  }
};
//마우스 이벤트
const onMouseDown = (e) => {
  //왼쪽 버튼
  if (e.button === 0 || e.which === 1) {
    mouseLeftEvent(e);
  }

  //오른쪽 버튼
  if (e.button === 2 || e.which === 3) {
    mouseRightEvent(e);
  }
};
//오른쪽 클릭 메뉴 비활성화
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});
//클릭 이벤트
document.addEventListener('mousedown', onMouseDown);
//이벤트 종료 후 로컬 스토리지 저장
document.addEventListener('mouseup', (e) => {
  const store = document.getElementsByClassName('wrap')[0].innerHTML;
  try {
    localStorage.setItem('now', store);
  } catch (error) {
    console.log(error);
  }
});
