import 'package:amazon_clone_27may/common/widgets/bottom_bar.dart';
import 'package:amazon_clone_27may/features/admin/screens/add_product_screen.dart';
import 'package:amazon_clone_27may/features/auth/screens/auth_screen.dart';
import 'package:amazon_clone_27may/features/home/screens/category_deals_screen.dart';
import 'package:amazon_clone_27may/features/home/screens/home_screen.dart';
import 'package:amazon_clone_27may/features/product_details/screens/product_details_screen.dart';
import 'package:amazon_clone_27may/features/search/screens/search_screen.dart';
import 'package:amazon_clone_27may/models/product.dart';
import 'package:flutter/material.dart';

Route<dynamic> generateRoute(RouteSettings routeSettings) {
  switch (routeSettings.name) {
    case AuthScreen.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const AuthScreen(),
      );
    case SearchScreen.routeName:
      var searchQuery = routeSettings.arguments as String;
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => SearchScreen(
          searchQuery: searchQuery,
        ),
      );
    case CategoriesDealsScreen.routeName:
      var category = routeSettings.arguments as String;
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => CategoriesDealsScreen(
          category: category,
        ),
      );
    case AddProductScreen.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const AddProductScreen(),
      );
    case ProductDetailsScreen.routeName:
      var product = routeSettings.arguments as Product;
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => ProductDetailsScreen(
          product: product,
        ),
      );
    case HomeScreen.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const HomeScreen(),
      );
    case BottomBar.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const BottomAppBar(),
      );
    default:
      return MaterialPageRoute(
        builder: (_) => const Scaffold(
          body: Center(
            child: Text('No route defined for this'),
          ),
        ),
      );
  }
}
