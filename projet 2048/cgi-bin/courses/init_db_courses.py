import sqlite3

connection = sqlite3.connect('database_courses.db')


with open('schema_courses.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO courses (sigle, opened) VALUES (?, ?)",
            ('IFT3225', 'true')
            )

connection.commit()
connection.close()
