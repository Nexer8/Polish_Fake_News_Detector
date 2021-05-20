# Instruction

Following command installs the necessary package to communicate with *Clarin-PL* tools. It has to be installed prior to
both development and running the server.

```bash
pip install -i https://pypi.clarin-pl.eu lpmn_client
````

### Warning

This library will not run successfully on Windows.

## Server

In order to run the server only, execute the command below.

```bash
pip install -r server_requirements.txt
```

To run the server execute:

```bash
python server.py
```

By default, it will run the server under http://127.0.0.1:8000. The only endpoint implements the *GET* method and is
available under */classify/{text_body}*.

There is also a possibility to run *Swagger* under */docs*.

## Model generation

Following command installs all the requirements necessary for the development.

```bash
pip install -r requirements.txt
```

If a reevaluation of models' parameters is necessary, uncomment appropriate lines in *main.py* and execute the command
below.

```bash
python main.py
```
