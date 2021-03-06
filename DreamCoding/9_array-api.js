// Q1. make a string out of an array
{
  const fruits = ['apple', 'banana', 'orange'];
  const result = fruits.join(', ');
  console.log(result);
}

// Q2. make an array out of a string
{
  const fruits = 'π, π₯, π, π';
  const result = fruits.split(',', 2);
  console.log(result);
}

// Q3. make this array look like this: [5, 4, 3, 2, 1]
{
  const array = [1, 2, 3, 4, 5];
  const result = array.reverse();
  console.log(result);
  console.log(array);
}

// Q4. make new array without the first two elements
{
  const array = [1, 2, 3, 4, 5];
  // const result = array.splice(0, 2); λ°°μ΄ μμ²΄λ₯Ό μμ 
  // λ°°μ΄μμ μνλ λΆλΆλ§ λ¦¬ν΄ν΄μ λ°μμ€κ³  μΆμλ
  const result = array.slice(2, 5);
  console.log(result);
  console.log(array);
}

class Student {
  constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
  }
}
const students = [
  new Student('A', 29, true, 45),
  new Student('B', 28, false, 80),
  new Student('C', 30, true, 90),
  new Student('D', 40, false, 66),
  new Student('E', 18, true, 88),
];

// Q5. find a student with the score 90
{
  const result = students.find(student => student.score === 90);
  console.log(result);
}

// Q6. make an array of enrolled students
{
  // μ½λ°± ν¨μκ° trueμ΄λ©΄ κ·Έ μμ΄λ€μ μλ‘μ΄ λ°°μ΄λ‘ λ§λ€μ΄μ μ λ¬νλ€.
  // ex) const result = students.filter(student => student.age < 40);
  const result = students.filter(student => student.enrolled);
  console.log(result);
}

// Q7. make an array containing only the students' scores
// result should be: [45, 80, 90, 66, 88]
{
  // mapμ λ°°μ΄μμ λ€μ΄μλ λͺ¨λ  μμλ€μ μ°λ¦¬κ° μ λ¬ν΄μ€ μ½λ°±ν¨μλ₯Ό
  // νΈμΆνλ©΄μ μ½λ°±ν¨μμμ κ°κ³΅λμ΄ λ¦¬ν΄λ κ°μΌλ‘ λμ²΄ν¨
  // mapμ μΈ λλ μ½λ°±ν¨μ μΈμλ μ΄ν΄νκΈ° μ¬μ΄ μΈμλ‘ μ΄λ€! value μ΄λ°κ±° μλ¨.
  const result = students.map(student => student.score * 2);
  console.log(result);
}

// Q8. check if there is a student with the score lower than 50
{
  // someμ λ°°μ΄μ μμμ€μ μ½λ°±ν¨μκ° trueλ‘ λ¦¬ν΄λλ μ κ° μλμ§ μλμ§ νμΈ
  const result = students.some(student => student.score < 50);
  console.log(result);

  // everyλ₯Ό μ¬μ©
  const result2 = !students.every(student => student.score >= 50);
  console.log(result2);
}

// Q9. compute students' average score
{
  // reduce : μ½λ°± ν¨μλ λ°°μ΄μμ λ€μ΄μλ λͺ¨λ  μμκ° νΈμΆλ¨
  // μ½λ°±ν¨μμμ λ¦¬ν΄λλ κ°μ ν¨κ» λμ λ κ²°κ³Όκ°μ λ¦¬ν΄νλ€.
  // currμ λ°°μ΄ νλμ© currμ μ λ¬
  // prevμ λ¦¬ν΄ν κ°μ΄ κ·Έ λ€μμ νΈμΆλ  λ prevλ‘ μ λ¬λλ€.
  const result = students.reduce((prev, curr) => prev + curr.score, 0);
  console.log(result / students.length);
}

// Q10. make a string containing all the scores
// result should be: '45, 80, 90, 66, 88'
{
  const result = students
    .map(student => student.score)
    .filter(score => score >= 50) // 50μ  μ΄μμΈ μ μλ§ νν°λ§
    .join();
  console.log(result);
}

// Bonus! do Q10 sorted in ascending order
// result should be: '45, 66, 80, 88, 90'
{
  const result = students
    .map(student => student.age)
    .sort((a, b) => b - a)
    .join();
  console.log(result);
}
