from flask import Flask, render_template, request, url_for, flash, redirect, jsonify, flash
from werkzeug.exceptions import abort
import pymysql
import pymysql.cursors


def get_db_connection(sql_type, sql_req, user, password, profil):

    connection = pymysql.connect(host=sql_hostname, user=sql_username,passwd=sql_password, db=sql_main_database)

    try:

        with connection.cursor() as cur:
            # N.B selectUser est utiliser pour toutes requetes sql avec un WHERE avec 1 parametre
            if sql_type == "selectUser":
                cur.execute(sql_req, (user))
                rows = cur.fetchall()
                return rows

            if sql_type == "select":
                cur.execute(sql_req, (user, password))
                rows = cur.fetchall()
                return rows

            if sql_type == "selectAll":
                cur.execute(sql_req)
                rows = cur.fetchall()
                return rows

            if sql_type == "insert":
                cur.execute(sql_req, (user, password, profil))
                connection.commit()

            if sql_type == "update":
                cur.execute(sql_req, (password, user))
                connection.commit()

    finally:
        connection.close()

# SQL Queries
sql_select_one = "SELECT `profil` FROM `pazcarlo_2048` WHERE `nom` = %s AND `mot_de_passe` = %s "
sql_select_one_user = "SELECT `nom` FROM `pazcarlo_2048` WHERE `nom` = %s"
sql_select_active = "SELECT `nom` FROM `pazcarlo_2048` WHERE `actif` = %s"
sql_select_all = "SELECT `nom`,`score`,`date_inscription`  FROM `pazcarlo_2048`"
sql_insert = "INSERT INTO `pazcarlo_2048` (`nom`, `mot_de_passe`,`profil` ) VALUES (%s,%s,%s)"
sql_update = "UPDATE `pazcarlo_2048` SET `actif` = %s WHERE `nom` = %s"


app = Flask(__name__)
app.config['SECRET_KEY'] = 'your secret key'

sql_hostname = 'www-ens.iro.umontreal.ca'
sql_username = 'pazcarlo'
sql_password = 'rlop091P'
sql_main_database = 'pazcarlo_db'

@app.route("/")
def home():
    return render_template('home.html')


@app.route("/signup", methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        user = request.form['username']
        password = request.form['password']
        cpw = request.form['confirm_password']
        profil = request.form['options']
        test = False

        if password != cpw:
            flash("Validation error: The password confirmation does not match.")
            test = True

        result = get_db_connection(
            "selectUser", sql_select_one_user, user, password, profil)
    
        if len(result) != 0:
            flash("Error: username already taken.")
            test = True

        if test == True:
            return redirect(url_for('signup'))

        else:

            result = get_db_connection(
                "insert", sql_insert, user, password, profil)
            flash("Account created.")
            return redirect(url_for('home'))

    return render_template('signup.html')

@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = request.form['user']
        password = request.form['pw']
        profil = ""
        result = get_db_connection(
            "select", sql_select_one, user, password, profil)
        profil = result[0][0]

        if len(result) == 1:
            result = get_db_connection("update", sql_update, user,"true", "")
            if profil == "player":
                return render_template('index.html', user=user)
            else:
                return render_template('admin.html', user=user)
        else:
            flash("Error: incorrect username or/and password entered. please try again")
            return redirect(url_for('login'))        
    return render_template('login.html')


@app.route("/admin", methods=['POST'])
def admin():
    if request.method == 'POST':
        username = request.form['username']
        res = get_db_connection("update", sql_update, username,"true", "")
        result = get_db_connection(
            "selectAll", sql_select_all, "user", "password", "profil")
        
        return render_template('admin.html', result=result,user=username)
    



@app.route("/player", methods=['POST'])
def player():
    if request.method == 'POST':
        username = request.form['username']
        res = get_db_connection("update", sql_update, username,"true", "")
        return render_template('index.html',user=username)
