//初始化当前编辑器类型
var localTemplateType = localStorage.getItem('templateType');
var templateType = localTemplateType ? localTemplateType : $('#aceEditorTypeList option:selected').val().split('/')[2];
//初始化插入编辑器模板列表
var templates = {
    html: {
        template: '<!DOCTYPE html>',
        name: 'html.html'
    },
    php: {
        template: '' +
        '<?php\n' +
        'print("Hello, World\\n");\n' +
        '?>',
        name: 'main.php'
    },
    'mode-assembly_x86':{
        template: '' +
        '[section .data]         ;  // 注释\n' +
        '    strHello db "Hello,world!", 0Ah\n' +
        '    STRLEN equ $ - strHello\n' +
        '    [section .text]  ; \n' +
        '    global _start    ; \n' +
        ' \n' +
        '_start:\n' +
        '    mov edx, STRLEN\n' +
        '    mov ecx, strHello\n' +
        '    mov ebx, 1\n' +
        '    mov eax, 4    ;  sys_write\n' +
        '    int 0x80         ;  系统调用\n' +
        '    mov ebx, 0\n' +
        '    mov eax, 1    ;  sys_exit\n' +
        '    int 0x80         ;  系统调用',
        name: 'main.asm'
    }
    ,'bash': {
        template: '' +
        'echo Hello,world' +
        '',
        name: 'bash.sh'
    },
    'basic': {
        template: '' +
        'PRINT "Hello, World"' +
        '',
        name: 'basic.txt'
    },
    'c': {
        template: '' +
        '#include <stdlib.h>\n' +
        ' \n' +
        'int main()\n' +
        '{\n' +
        '    printf("Hello, World");\n' +
        '    return(0);\n' +
        '}',
        name: 'hello.c'
    },
    'csharp': {
        template: '' +
        'using System;\n' +
        'class Program\n' +
        '{\n' +
        '    public static void Main(string[] args)\n' +
        '    {\n' +
        '        Console.WriteLine("Hello, World");\n' +
        '    }\n' +
        '}',
        name: 'hello.cs'
    },
    'c_cpp': {
        template: '' +
        '#include <iostream>\n' +
        ' \n' +
        'int main()\n' +
        '{\n' +
        '    std::cout << "Hello World";\n' +
        '    return 0;\n' +
        '}',
        name: 'hello.cpp'
    },
    'clojure': {
        template: '' +
        '(println "hello world")',
        name: 'clojure'
    },
    'cobol': {
        template: '' +
        'IDENTIFICATION DIVISION.\n' +
        'PROGRAM-ID. hello.\n' +
        'PROCEDURE DIVISION.\n' +
        'DISPLAY "Hello, world!".\n' +
        'STOP RUN.',
        name: 'cobol'
    },
    'commonlisp': {
        template: '' +
        '(defun hello-world()\n' +
        '      (format t "Hello,World!"))\n' +
        '\n' +
        '(hello-world)',
        name: 'common_lisp'
    },
    'd': {
        template: '' +
        'import std.stdio;\n' +
        '\n' +
        'void main()\n' +
        '{\n' +
        '    writeln("Hello World");\n' +
        '}',
        name: 'helloword.d'
    },
    'elixir': {
        template: 'IO.puts "hello word"',
        name: 'elixir'
    },
    'erlang': {
        template: '' +
        'main(_) ->\n' +
        '\tio:fwrite("Hello, World\\n").\n',
        name: 'main.erlang'
    },
    'executable': {
        template: '',
        name: 'main.executable'
    },
    'fsharp': {
        template: 'printfn "hello world"',
        name: 'main.f'
    },
    'fortran': {
        template: '' +
        'program main\n' +
        '\tprint *, "Hello, World"\n' +
        'end\n',
        name: ''
    },
    'golang': {
        template: '' +
        'package main\n' +
        '\n' +
        'import "fmt"\n' +
        '\n' +
        'func main() {\n' +
        '    fmt.Println("Hello world!")\n' +
        '}',
        name: 'main.go'
    },
    'groovy': {
        template: '',
        name: 'main.groovy'
    },
    'haskell': {
        template: 'main = putStrLn "Hello, World"',
        name: 'main.haskell'
    },
    'java': {
        template: '' +
        'public class Main {\n' +
        '\tpublic static void main(String[] args) {\n' +
        '\t\tSystem.out.println("Hello, World");\n' +
        '\t}\n' +
        '}\n',
        name: 'main.java'
    },
    'javascript': {
        template: '' +
        'console.log("Hello, World");',
        name: 'main.js'
    },
    'kotlin': {
        template: '' +
        'fun main() {\n' +
        '\tprintln("Hello, World")\n' +
        '}\n',
        name: 'main.kt'
    },
    'lua': {
        template: '' +
        'print("Hello, World")',
        name: 'main.lua'
    },
    'object_c': {
        template: '' +
        '#import <Foundation/Foundation.h>\n' +
        ' \n' +
        'int main(int argc, const char * argv[]) {\n' +
        '    @autoreleasepool {\n' +
        '        NSLog(@"Hello, World!");\n' +
        '    }\n' +
        '     return 0;\n' +
        '}',
        name: 'main.c'
    },
    'ocaml': {
        template: 'print_endline "Hello, World"',
        name: 'main.oc'
    },
    'octave': {
        template: 'printf("Hello, World\\n");',
        name: 'main.octave'
    },
    'pascal': {
        template: '' +
        'program Hello;\n' +
        'begin\n' +
        '\twriteln (\'Hello, World\')\n' +
        'end.\n',
        name: 'main.pas'
    },
    'perl': {
        template: '' +
        '#!/usr/bin/perl \n' +
        ' \n' +
        'print "Hello, World!\\n";',
        name: 'main.perl'
    },
    'plain': {
        template: 'Hello, World',
        name: 'main.plain'
    },
    'prolog': {
        template: '' +
        ':- initialization(main).\n' +
        'main :- write(\'Hello, World\\n\').\n',
        name: 'main.prolog'
    },
    'python': {
        template: '' +
        'import sys\n' +
        'import os\n' +
        'print "Hello,World"',
        name: 'main.py'
    },
    'python3': {
        template: '' +
        'import sys\n' +
        'import os\n' +
        'print("Hello,World")',
        name: 'main.py3'
    },
    'r': {
        template: '' +
        'cat("Hello, World\\n")',
        name: 'main.r'
    },
    'ruby': {
        template: '' +
        'puts "Hello, World"',
        name: 'main.ruby'
    },
    'rust': {
        template: '' +
        'fn main() {\n' +
        '\tprintln!("Hello, World");\n' +
        '}\n',
        name: 'main.ru'
    },
    'scala': {
        template: '' +
        'object Main {\n' +
        '\tdef main(args: Array[String]) = {\n' +
        '\t\tprintln("Hello, World")\n' +
        '\t}\n' +
        '}\n',
        name: 'main.sc'
    },
    'sql': {
        template: '' +
        'CREATE TABLE Person (\n' +
        '\tPersonID int,\n' +
        '\tLastName varchar(255),\n' +
        '\tFirstName varchar(255),\n' +
        '\tAddress varchar(255),\n' +
        '\tCity varchar(255)\n' +
        ');\n' +
        '\n' +
        'INSERT INTO Person VALUES (1, \'Tom\', \'Erichsen\', \'Skagen 210, Stavanger 4006\', \'Norway\');\n' +
        '\n' +
        'SELECT * FROM Person;\n',
        name: 'main.sql'
    },
    'swift': {
        template: '' +
        'print("Hello, World")',
        name: 'main.sw'
    },
    'typescript': {
        template: '' +
        'console.log("Hello, World");',
        name: 'main.ts'
    },
    'vbscript': {
        template: '' +
        'Public Module Program\n' +
        '\t Public Sub Main()\n' +
        '\t\tConsole.WriteLine("Hello, World")\n' +
        '\t End Sub\n' +
        'End Module\n',
        name: 'main.vs'
    },
};

//获取模板内容或则插入模板
function insertTemplate() {
    var editorCon = templates[templateType].template;
    return editorCon || '';
}