Тесты к курсу "Парадигмы программирования (Java)"
====

[Условия домашних заданий](http://www.kgeorgiy.info/courses/java-intro/homeworks.html)

Домашнее задание 2. Бинарный поиск
----
* [Тесты к сложной версии задания](BinarySearchHard.java)
* [Тесты к простой версии задания](BinarySearchEasy.java)


Домашнее задание 3. Очередь на массиве
----
*  Сложная версия
   * Должна быть реализована очередь с двумя концами (дэк, deque)
   * Название классов: ``ArrayDequeSingleton`` (модуль), ``ArrayDequeuADT`` (абстрактный тип данных), ``ArrayDeque`` (обычный класс)
   * Методы:
      * Работа с началом очереди: ``addFirst``, ``removeFirst``, ``peekFirst``
      * Работа с концом очереди: ``addLast``, ``removeLast``, ``peekLast``
      * Размеры: ``size``, ``isEmpty``
   * [Тесты](ArrayDequeTest.java)
* Простая версия
   * Должна быть реализована FIFO-очередь
   * Название классов: ``ArrayQueueSingleton`` (модуль), ``ArrayQueueADT`` (абстрактный тип данных), ``ArrayQueue`` (обычный класс)
   * Методы:
      * Добавление элемента: ``enqueue``
      * Удаление элемента: ``dequeue``
      * Просмотр элемента: ``peek``
      * Размеры: ``size``, ``isEmpty``
   * [Тесты](ArrayQueueTest.java)

Домашнее задание 4. Вычисление выражений
----
* Сложная версия
    * Выражения должны поддерживать три переменные -- ``x``, ``y`` и ``z``.
    * Выражения должны реализовывать интерфейс [Expression3](Expression3.java).
    * [Тесты](TripleExpressionTest.java)
* Простая версия
    * Выражения должны поддерживать три -- ``x``, ``y`` и ``z``.
    * Выражения должны реализовывать интерфейс [Expression](Expression.java).
    * [Тесты](SingleExpressionTest.java)

Домашнее задание 5. Разбор выражений
----
* Программа должна принимать из командной строки один параметр: строка, которая содержит арифметическое выражение. Название класса программы: ``Parser``
* В выражении могут встречаться умножение ``*``, деление ``/``, сложение ``+``, вычитание ``-``, унарный минус, целочисленные константы (в десятичной системе счисления, которые помещаются в 32-битный знаковый целочисленный тип), круглые скобки, переменные (для сложного -- ``x``, ``y`` и ``z``, для простого -- ``x``) и произвольное число пробельных символов в любом месте (не внутри констант).
* Операторы, упорядоченные по приоритетам, начиная с самого приоритетного
    * унарный минус
    * умножение и деление
    * сложение и вычитание
* Деление выполняется целочисленно (смотрите, как делятся ``int``'ы)
* Рекомендуется использовать алгоритм рекурсивного спуска разбора выражений. Алгоритм должен работать за линейное время.
