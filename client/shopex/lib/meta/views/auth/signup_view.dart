import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:page_transition/page_transition.dart';
import 'package:shopex/app/shared/colors.dart';
import 'package:shopex/app/shared/dimensions.dart';
import 'package:eva_icons_flutter/eva_icons_flutter.dart';
import 'package:shopex/meta/views/auth/login_view.dart';

class SignupView extends StatelessWidget {
  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: darkColor,
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            vSizedBox3,
            vSizedBox1,
            Container(
              child: Row(
                children: [
                  IconButton(
                      icon: Icon(EvaIcons.arrowBackOutline),
                      color: textColor,
                      onPressed: () {})
                ],
              ),
            ),
            vSizedBox4,
            Container(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text("¡Bienvenido!",
                      style: TextStyle(
                          fontSize: 40,
                          fontWeight: FontWeight.w900,
                          color: whiteColor)),
                  Text("Qué bueno verte",
                      style: TextStyle(
                          fontSize: 26,
                          fontWeight: FontWeight.w500,
                          color: whiteColor)),
                  Text("Completa tus datos",
                      style: TextStyle(
                          fontSize: 26,
                          fontWeight: FontWeight.w500,
                          color: whiteColor)),
                ],
              ),
            ),
            vSizedBox3,
            vSizedBox1,
            Container(
              child: Column(
                children: [
                  vSizedBox1,
                  stylishTextField("Nombre", nameController),
                  vSizedBox1,
                  stylishTextField("Email", emailController),
                  vSizedBox1,
                  stylishTextField("Contraseña", passwordController),
                ],
              ),
            ),
            vSizedBox4,
            Container(
              alignment: Alignment.center,
              child: Column(
                  verticalDirection: VerticalDirection.up,
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    RichText(
                      text: TextSpan(children: <TextSpan>[
                        TextSpan(
                          text: "¿Ya tienes una cuenta?",
                          style: TextStyle(
                              color: textColor,
                              fontWeight: FontWeight.w700,
                              fontFamily: "Montserrat"),
                        ),
                        TextSpan(
                          text: " Login",
                          recognizer: TapGestureRecognizer()
                            ..onTap = () {
                              Navigator.pushReplacement(
                                  context,
                                  PageTransition(
                                      child: LoginView(),
                                      type: PageTransitionType.rightToLeft));
                            },
                          style: TextStyle(
                              decoration: TextDecoration.underline,
                              color: textColor,
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              fontFamily: "Montserrat"),
                        ),
                      ]),
                    ),
                    vSizedBox2,
                    Container(
                      width: 300.0,
                      height: 50.0,
                      decoration: BoxDecoration(
                          color: Colors.white.withOpacity(1),
                          borderRadius: BorderRadius.circular(18.0)),
                      child: Center(
                        child: Text(
                          "Registrarse",
                          style: TextStyle(
                              fontSize: 18.0,
                              fontWeight: FontWeight.w900,
                              fontFamily: "Montserrat"),
                        ),
                      ),
                    )
                  ]),
            )
          ],
        ),
      ),
    );
  }

  stylishTextField(String text, TextEditingController textEditingController) {
    return TextField(
      controller: textEditingController,
      style: TextStyle(color: whiteColor, fontSize: 18.0),
      decoration: new InputDecoration(
        suffixIcon: IconButton(
          onPressed: () {},
          icon: Icon(EvaIcons.backspace, color: textColor),
        ),
        filled: true,
        hintText: text,
        hintStyle: new TextStyle(color: textColor, fontSize: 14),
        fillColor: bgColor,
        border: new OutlineInputBorder(
          borderSide: BorderSide.none,
          borderRadius: BorderRadius.all(const Radius.circular(15.0)),
        ),
      ),
    );
  }
}
