#!/usr/bin/python3

import json
import sqlite3
from flask import Flask, jsonify, request

app = Flask(__name__)

#courses = [
#    {'sigle': 'IFT3225', 'opened': 'true'},
#    {'sigle': 'IFT1015', 'opened': 'true'},
#    {'sigle': 'ECN1015', 'opened': 'false'},
#    {'sigle': 'HIS1000', 'opened': 'false'}
#]

def get_db_connection():
    conn = sqlite3.connect('database_courses.db')
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/')
def get_courses():
  data = []
  conn = get_db_connection()
  courses = conn.execute('SELECT * FROM courses').fetchall()
  conn.close()
  for course in courses:
    data.append([x for x in course])
  return jsonify(data)


@app.route('/', methods=['POST'])
def add_course():
  data = request.get_json()
  conn = get_db_connection()
  conn.execute('INSERT INTO courses (sigle, opened) VALUES (?, ?)',
                (data["sigle"], data["opened"]))
  conn.commit()
  conn.close()
  return '', 200