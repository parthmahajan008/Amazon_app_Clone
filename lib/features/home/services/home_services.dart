import 'dart:convert';

import 'package:amazon_clone_27may/constants/global_variables.dart';
import 'package:amazon_clone_27may/constants/utils.dart';
import 'package:amazon_clone_27may/providers/user_provider.dart';
import 'package:http/http.dart' as http;
import 'package:amazon_clone_27may/constants/error_handling.dart';
import 'package:amazon_clone_27may/models/product.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class HomeServices {
  Future<List<Product>> fetchCategoryProduct({
    required BuildContext context,
    required String category,
  }) async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);
    List<Product> productList = [];
    try {
      http.Response res = await http.get(
        Uri.parse('$uri/api/get-products?category=$category'),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'x-auth-token': userProvider.user.token,
        },
      );

      httpErrorHandle(
        response: res,
        context: context,
        onSuccess: () {
          for (int i = 0; i < jsonDecode(res.body).length; i++) {
            productList.add(
              Product.fromJson(
                jsonEncode(
                  jsonDecode(res.body)[i],
                ),
              ),
            );
          }
        },
      );
    } catch (e) {
      showSnackBar(context, e.toString());
    }
    return productList;
  }
}
