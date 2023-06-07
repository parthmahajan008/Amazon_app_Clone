import 'package:amazon_clone_27may/models/user.dart';
import 'package:flutter/material.dart';

class UserProvider extends ChangeNotifier {
  User _user = User(
    id: '',
    name: '',
    email: '',
    password: '',
    address: '',
    type: '',
    token: '',
    cart: [],
  );

  User get user => _user; //coz _user is a private variable we create a getter
  void setUserFromModel(User user) {
    _user = user;
    notifyListeners();
  }

  void setUser(String user) {
    //we use a string user as parameter coz req.body will be a string
    _user = User.fromJson(user);
    notifyListeners();
  }
}
