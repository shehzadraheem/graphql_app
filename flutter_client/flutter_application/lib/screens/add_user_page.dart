import 'package:flutter/material.dart';
import 'package:flutter_application/screens/home_screen.dart';
import 'package:flutter_application/stylings/stylings.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class AddUserPage extends StatefulWidget {
  const AddUserPage({Key? key}) : super(key: key);

  @override
  _AddUserPageState createState() => _AddUserPageState();
}

class _AddUserPageState extends State<AddUserPage> {
  final _formKey = GlobalKey<FormState>();
  final _hobbyFormKey = GlobalKey<FormState>();
  final _postFormKey = GlobalKey<FormState>();

  final _nameController = TextEditingController();
  final _ageController = TextEditingController();
  final _professionController = TextEditingController();
  final _hobbyTitleController = TextEditingController();
  final _hobbyDescriptionController = TextEditingController();
  final _postController = TextEditingController();

  bool _isSaving = false;

  bool _visible = false;

  bool _isSavingHobby = false;
  bool _isSavingPost = false;

  var currUserId;

  void _toggle() {
    setState(() {
      _visible = !_visible;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Add a User",
          style: TextStyle(
              color: Colors.grey, fontSize: 19, fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.lightGreen,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        child: Container(
          padding: const EdgeInsets.all(24),
          margin: const EdgeInsets.symmetric(horizontal: 24, vertical: 6),
          decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              boxShadow: [
                BoxShadow(
                    offset: const Offset(0, 10),
                    color: Colors.grey.shade300,
                    blurRadius: 30),
              ]),
          child: Column(
            children: [
              Mutation(
                options: MutationOptions(
                  document: gql(insertUser()),
                  fetchPolicy: FetchPolicy.noCache,
                  onCompleted: (data) {
                    setState(() {
                      _isSaving = false;
                      currUserId = data!['CreateUser']["id"];
                    });
                  },
                ),
                builder: (runMutation, result) {
                  return Form(
                    key: _formKey,
                    child: Column(
                      children: [
                        const SizedBox(
                          height: 12,
                        ),
                        TextFormField(
                            controller: _nameController,
                            decoration: const InputDecoration(
                                labelText: "Name",
                                fillColor: Colors.white,
                                border: OutlineInputBorder(
                                    borderSide: BorderSide())),
                            validator: (value) {
                              if (value!.isEmpty) {
                                return "Name cannot be empty";
                              } else {
                                return null;
                              }
                            },
                            keyboardType: TextInputType.text),
                        const SizedBox(
                          height: 12,
                        ),
                        TextFormField(
                            controller: _professionController,
                            decoration: const InputDecoration(
                                labelText: "Profession",
                                fillColor: Colors.white,
                                border: OutlineInputBorder(
                                    borderSide: BorderSide())),
                            validator: (value) {
                              if (value!.isEmpty) {
                                return "Profession cannot be empty";
                              } else {
                                return null;
                              }
                            },
                            keyboardType: TextInputType.text),
                        const SizedBox(
                          height: 12,
                        ),
                        TextFormField(
                            controller: _ageController,
                            decoration: const InputDecoration(
                                labelText: "Age",
                                fillColor: Colors.white,
                                border: OutlineInputBorder(
                                    borderSide: BorderSide())),
                            validator: (value) {
                              if (value!.isEmpty) {
                                return "Age cannot be empty";
                              } else {
                                return null;
                              }
                            },
                            keyboardType: TextInputType.number),
                        const SizedBox(
                          height: 12,
                        ),
                        _isSaving
                            ? const SizedBox(
                                height: 20,
                                width: 20,
                                child: CircularProgressIndicator(
                                  strokeWidth: 3,
                                ),
                              )
                            : TextButton(
                                style: buildButtonStyle(),
                                onPressed: () {
                                  if (_formKey.currentState!.validate()) {
                                    _toggle();
                                    setState(() {
                                      _isSaving = true;
                                    });
                                    runMutation({
                                      "name": _nameController.text.trim(),
                                      "profession":
                                          _professionController.text.trim(),
                                      "age":
                                          int.parse(_ageController.text.trim())
                                    });
                                    _nameController.clear();
                                    _professionController.clear();
                                    _ageController.clear();
                                  }
                                },
                                child: const Padding(
                                    padding: EdgeInsets.symmetric(
                                        horizontal: 36, vertical: 12),
                                    child: Text("Save")),
                              )
                      ],
                    ),
                  );
                },
              ),

              //Add Hobby
              Visibility(
                  visible: _visible,
                  child: Mutation(
                    options: MutationOptions(
                        document: gql(insertHobby()),
                        fetchPolicy: FetchPolicy.noCache,
                        onCompleted: (data) {
                          setState(() {
                            _isSavingHobby = false;
                          });
                        }),
                    builder: (runMutation, result) {
                      return Form(
                        key: _hobbyFormKey,
                        child: Column(
                          children: [
                            const SizedBox(height: 12),
                            TextFormField(
                              controller: _hobbyTitleController,
                              decoration: const InputDecoration(
                                  labelText: "Hobby title",
                                  fillColor: Colors.white,
                                  border: OutlineInputBorder(
                                      borderSide: BorderSide())),
                              validator: (v) {
                                if (v!.isEmpty) {
                                  return "Enter a title";
                                } else {
                                  return null;
                                }
                              },
                              keyboardType: TextInputType.text,
                            ),
                            const SizedBox(height: 12),
                            TextFormField(
                              controller: _hobbyDescriptionController,
                              decoration: const InputDecoration(
                                  labelText: "Hobby description",
                                  fillColor: Colors.white,
                                  border: OutlineInputBorder(
                                      borderSide: BorderSide())),
                              validator: (v) {
                                if (v!.isEmpty) {
                                  return "Description cannot be empty";
                                } else {
                                  return null;
                                }
                              },
                              keyboardType: TextInputType.text,
                            ),
                            const SizedBox(height: 12),
                            _isSavingHobby
                                ? const SizedBox(
                                    height: 20,
                                    width: 20,
                                    child: CircularProgressIndicator(
                                      strokeWidth: 3,
                                    ),
                                  )
                                : TextButton(
                                    onPressed: () {
                                      if (_hobbyFormKey.currentState!
                                          .validate()) {
                                        setState(() {
                                          _isSavingHobby = true;
                                        });
                                        runMutation({
                                          'title': _hobbyTitleController.text,
                                          'description':
                                              _hobbyDescriptionController.text,
                                          'userId': currUserId
                                        });

                                        _hobbyTitleController.clear();
                                      }
                                      _hobbyTitleController.clear();
                                      _hobbyDescriptionController.clear();
                                    },
                                    style: buildButtonStyle(),
                                    child: const Padding(
                                      padding: EdgeInsets.symmetric(
                                          horizontal: 36, vertical: 12),
                                      child: Text(
                                        "Save",
                                        style: TextStyle(
                                            color: Colors.grey, fontSize: 16),
                                      ),
                                    ),
                                  )
                          ],
                        ),
                      );
                    },
                  )),

              // Save a Post
              Visibility(
                visible: _visible,
                child: Mutation(
                  options: MutationOptions(
                    document: gql(insertPost()),
                    fetchPolicy: FetchPolicy.noCache,
                    onCompleted: (data) {
                      setState(() {
                        _isSavingPost = false;
                      });
                    },
                  ),
                  builder: (runMutation, result) {
                    return Form(
                      key: _postFormKey,
                      child: Column(
                        children: [
                          const SizedBox(height: 12),
                          TextFormField(
                            controller: _postController,
                            decoration: const InputDecoration(
                                labelText: "Post Comment ",
                                fillColor: Colors.white,
                                border: OutlineInputBorder(
                                    borderSide: BorderSide())),
                            validator: (v) {
                              if (v!.isEmpty) {
                                return "Post cannot be empty";
                              } else {
                                return null;
                              }
                            },
                            keyboardType: TextInputType.text,
                          ),
                          const SizedBox(height: 12),
                          _isSavingPost
                              ? const SizedBox(
                                  height: 20,
                                  width: 20,
                                  child: CircularProgressIndicator(
                                    strokeWidth: 3,
                                  ),
                                )
                              : TextButton(
                                  onPressed: () {
                                    if (_postFormKey.currentState!.validate()) {
                                      setState(() {
                                        _isSavingPost = true;
                                      });
                                      runMutation({
                                        'comment': _postController.text,
                                        'userId': currUserId
                                      });
                                      //clear fields
                                      _postController.clear();
                                    }
                                  },
                                  style: buildButtonStyle(),
                                  child: const Padding(
                                    padding: EdgeInsets.symmetric(
                                        horizontal: 36, vertical: 12),
                                    child: Text(
                                      "Save",
                                      style: TextStyle(
                                          color: Colors.grey, fontSize: 16),
                                    ),
                                  ),
                          )
                        ],
                      ),
                    );
                  },
                ),
              ),

              Padding(
                padding: const EdgeInsets.all(18.0),
                child: Visibility(
                    visible: _visible,
                    child: TextButton(
                      style: buildButtonStyle(),
                      onPressed: () {
                        Navigator.pushAndRemoveUntil(context, MaterialPageRoute(
                          builder: (context) {
                            return HomeScreen();
                          },
                        ), (route) => false);
                      },
                      child: const Padding(
                        padding: EdgeInsets.symmetric(
                            horizontal: 26.0, vertical: 12.0),
                        child: Text("Done",
                            style: TextStyle(color: Colors.grey, fontSize: 16)),
                      ),
                    )),
              )
            ],
          ),
        ),
      ),
    );
  }
}

String insertPost() {
  return """
    mutation CreatePost(\$comment: String!, \$userId: String!) {
      CreatePost(comment: \$comment, userId: \$userId){
         id
         comment
      }   
    }
    """;
}

String insertUser() {
  return """ 
   mutation CreateUser(\$name: String!, \$age: Int!, \$profession: String!){
     CreateUser(name: \$name, age: \$age, profession: \$profession) {
         id
         name
     }
}
  """;
}

String insertHobby() {
  return """
    mutation CreateHobby(\$title: String!, \$description: String!, \$userId: String!) {
      CreateHobby(title: \$title, description: \$description, userId: \$userId){
         id
         title
      }   
    }
    """;
}