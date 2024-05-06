const User = require("../../models/user.model");
const usersSocket = require("../../sockets/client/users.socket");
module.exports.notFriend = async (req, res) => {
  usersSocket(res);
  const userId = res.locals.user.id;
  const myUser = await User.findOne({
    _id: userId,
  });
  const requestFriends = myUser.requestFriends;
  const acceptFriends = myUser.acceptFriends;
  const users = await User.find({
    $and: [
      { _id: { $ne: userId } },
      { _id: { $nin: requestFriends } },
      { _id: { $nin: acceptFriends } },
    ],

    deleted: false,
    status: "active",
  }).select("id avatar fullName");

  res.render("client/pages/users/not-friend.pug", {
    titlePage: "Danh sách nguời dùng",
    users: users,
  });
};
module.exports.request = async (req, res) => {
  usersSocket(res);
  const userId = res.locals.user.id;
  const myUser = await User.findOne({
    _id: userId,
  });
  const requestFriends = myUser.requestFriends;

  const users = await User.find({
    _id: { $in: requestFriends },

    deleted: false,
    status: "active",
  }).select("id avatar fullName");

  res.render("client/pages/users/request.pug", {
    titlePage: "Lời mời đã gửi",
    users: users,
  });
};
module.exports.accept = async (req, res) => {
  usersSocket(res);
  const userId = res.locals.user.id;
  const myUser = await User.findOne({
    _id: userId,
  });
  const acceptFriends = myUser.acceptFriends;

  const users = await User.find({
    _id: { $in: acceptFriends },

    deleted: false,
    status: "active",
  }).select("id avatar fullName");

  res.render("client/pages/users/accept.pug", {
    titlePage: "Lời mời kết bạn",
    users: users,
  });
};
module.exports.friends = async (req, res) => {
  usersSocket(res);
  const userId = res.locals.user.id;
  const myUser = await User.findOne({
    _id: userId,
  });
  const acceptFriends = myUser.acceptFriends;

  const users = await User.find({
    _id: { $in: acceptFriends },

    deleted: false,
    status: "active",
  }).select("id avatar fullName");

  res.render("client/pages/users/friends.pug", {
    titlePage: "Danh sách bạn bè",
    users: users,
  });
};
