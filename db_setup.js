
const express = require("express");

const sqlite = require("sqlite3");

const db = new sqlite.Database("./db_sqlite");

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS students_db");
    db.run("DROP TABLE IF EXISTS teachers_db");
    db.run("DROP TABLE IF EXISTS flags_db");
    db.run("DROP TABLE IF EXISTS flag_db");

    db.run(`
        CREATE TABLE students_db (
            id INTEGER PRIMARY KEY,
            name TEXT,
            class TEXT,
            level TEXT
        )
    `);

    db.run(`
        CREATE TABLE teachers_db (
            id INTEGER PRIMARY KEY,
            name TEXT,
            role TEXT,
            password TEXT,
            classes TEXT
        )
    `);

    db.run(`
        CREATE TABLE flag_db (
            id INTEGER PRIMARY KEY,
            flag TEXT
        )
    `);

    // Grace Hoppers = hat ersten Compiler (mit-)entwickelt
    // Sundar Pichai = CEO von Alphabet
    // Linus Torvalds = Entwickler des Linux-Kernels
    // Richard Stallman = Gründer von GNU und Free-Software-Foundation
    // Sergey Brin = Mitgründer von Google
    // Reed Hastings = Mitgründer von Netflix
    // Jack Dorsey = Mitgründer von Twitter
    // Geoffrey Hinton = Enorm wichtig für KI
    // Sheryl Sandberg = COO von Facebook
    // Marc Andreesen = Entwicklung des ersten kommerziellen Browsers


    db.run(`
        INSERT INTO students_db (name, class, level) VALUES
            ('Bill Gates', 'Freitag 19:00', 'Intermediate'),
            ('Larry Page', 'Samstag 08:30', 'Beginner'),
            ('Jeff Bezos', 'Dienstag 17:30', 'Expert'),
            ('Steve Jobs', 'Montag 15:30', 'N/A'),
            ('Grace Hopper', 'Montag 18:30', 'Immeasurably'),
            ('Alan Turing', 'Montag 18:30', 'Immeasurably'),
            ('Tim Berners-Lee', 'Samstag 11:30', 'Intermediate'),
            ('Mark Zuckerberg', 'Dienstag 14:00', 'Intermediate'),
            ('Sundar Pichai', 'Mittwoch 10:30', 'Expert'),
            ('Linus Torvalds', 'Donnerstag 16:00', 'Expert'),
            ('Richard Stallman', 'Freitag 11:00', 'Advanced'),
            ('Sergey Brin', 'Samstag 09:30', 'Beginner'),
            ('Reed Hastings', 'Mittwoch 17:00', 'Intermediate'),
            ('Elon Musk', 'Donnerstag 08:00', 'Expert'),
            ('Jack Dorsey', 'Freitag 13:30', 'Advanced'),
            ('Geoffrey Hinton', 'Dienstag 19:00', 'Expert'),
            ('Sheryl Sandberg', 'Mittwoch 14:30', 'Advanced'),
            ('Marc Andreessen', 'Donnerstag 15:30', 'Intermediate')
    `);

    db.run(`
        INSERT INTO teachers_db (name, role, password, classes) VALUES
            ('Matthias Voit', 'teacher', 'C0d31sL1f3!', 'Freitag 13:30'),
            ('Frederick Kukla', 'teacher', 'P@ssw0rd42!', 'Montag 15:30'),
            ('Christopher Bell', 'teacher', 'ByteMe@2026', 'Freitag 11:00'),
            ('Lukas Gobelet', 'admin', 'N3rdLOve1337', 'Montag 18:30')
    `);

    db.run(`
        INSERT INTO flag_db (flag) VALUES
            ('flag{sql_injection}')
    `);

    console.log("Created database");
});