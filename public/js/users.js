///ADD FRIEND//
const listBtnAddfriend = document.querySelectorAll("[btn-add-friend]");
if (listBtnAddfriend.length > 0) {
  listBtnAddfriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("add");
      const userId = button.getAttribute("btn-add-friend");
      socket.emit("CLIENT_ADD_FRIEND", userId);
    });
  });
}
//
///CAncelFfriend
const listBtnCancelfriend = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelfriend.length > 0) {
  listBtnCancelfriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.remove("add");
      const userId = button.getAttribute("btn-cancel-friend");
      socket.emit("CLIENT_CANCEL_FRIEND", userId);
    });
  });
}
//
///refuse friends
const refuseFriend = (button) => {
  button.addEventListener("click", () => {
    button.closest(".box-user").classList.add("refuse");
    const userId = button.getAttribute("btn-refuse-friend");
    socket.emit("CLIENT_REFUSE_FRIEND", userId);
  });
};

const listBtnRefusefriend = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefusefriend.length > 0) {
  listBtnRefusefriend.forEach((button) => {
    refuseFriend(button);
  });
}
//Chức năng chấp nhận kb

const acceptFriend = (button) => {
  button.addEventListener("click", () => {
    button.closest(".box-user").classList.add("accepted");
    const userId = button.getAttribute("btn-accept-friend");
    socket.emit("CLIENT_ACCEPT_FRIEND", userId);
  });
};
const listBtnAcceptfriend = document.querySelectorAll("[btn-accept-friend]");
if (listBtnAcceptfriend.length > 0) {
  listBtnAcceptfriend.forEach((button) => {
    acceptFriend(button);
  });
}
///SERVER_RETURN_LENGTH_ACCEPT_FRIEND
const badgeUsersAccept = document.querySelector("[badge-users-accept]");
if (badgeUsersAccept) {
  const userId = badgeUsersAccept.getAttribute("badge-users-accept");
  socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
    if (userId === data.userId) {
      badgeUsersAccept.innerHTML = data.lengthAcceptFriends;
    }
  });
}

///
///SERVER_RETURN_INFO_ACCEPT_FRIEND
const dataUserAcceppt = document.querySelector("[data-users-accept]");
if (dataUserAcceppt) {
  const userId = dataUserAcceppt.getAttribute("data-users-accept");
  socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
    if (userId === data.userId) {
      ///vẽ user ra giao diện
      const div = document.createElement("div");

      div.classList.add("col-6");
      div.setAttribute("user-id", data.infoUserA._id);
      div.innerHTML = `
      <div class="col-6">
       <div class="box-user  ">
        <div class="inner-avatar">
         <img src="/image/avatar.jpg" alt="${data.infoUserA.fullName}"></div>
         <div class="inner-info">
          <div class="inner-name">${data.infoUserA.fullName}</div>
           <div class="inner-buttons">
           <button class="btn btn-sm btn-primary mr-1" btn-accept-friend="${data.infoUserA._id}">Chấp nhận</button>
           <button class="btn btn-sm btn-secondary mr-1" btn-refuse-friend="${data.infoUserA._id}">Xóa</button>
           <button class="btn btn-sm btn-secondary mr-1" btn-deleted-friend="6633abeb41eed9043370e0ba" disabled="disabled">Đã xóa</button>
          <button class="btn btn-sm btn-primary mr-1" btn-accepted-friend="6633abeb41eed9043370e0ba" disabled="disabled">Đã chấp nhận</button>
          </div>
         </div>
        </div>
      </div>
      `;
      dataUserAcceppt.appendChild(div);
      ///
      ///Hủy lời mời kết bạn
      const buttonRefuse = div.querySelector("[btn-refuse-friend]");
      refuseFriend(buttonRefuse);
      ///

      //Châps nhận lời kb
      const buttonAccept = div.querySelector("[btn-accept-friend]");
      acceptFriend(buttonAccept);
      //
    }
  });
}
///SERVER_RETURN_INFO_ACCEPT_FRIEND
socket.on("SERVER_RETURN_USER_ID_CANCEL_FRIEND", (data) => {
  const userIdA = data.userIdA;
  const boxUserRemove = document.querySelector(`[user-id='${userIdA}']`);
  if (boxUserRemove) {
    const dataUserAcceppt = document.querySelector("[data-users-accept]");
    const userIdB = badgeUsersAccept.getAttribute("badge-users-accept");
    if (userIdB === data.userIdB) {
      dataUserAcceppt.removeChild(boxUserRemove);
    }
  }
});
///
