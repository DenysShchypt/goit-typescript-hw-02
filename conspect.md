// Generics
// Загальна концепція



// Узагальнені типи (Generics) - це один із потужних інструментів TypeScript, що допомагають створювати код, який можна використовувати повторно, зберігаючи водночас строгу типізацію.



// Основна ідея узагальнених типів (Generics) полягає в тому, що вони дозволяють визначити "узагальнений" тип, який потім може бути спеціалізований для роботи з різними іншими типами. Замість того, щоб визначати окремі функції для кожного можливого типу даних, ви можете визначити одну функцію, яка працює з "будь-яким" типом даних.



// Давайте спочатку постараємося розібратися в наступному: ми хочемо створити масив, який міститиме лише рядки та числа. Що ми можемо вдіяти? Наприклад, приблизно так:



// let arr: any[] = [];


// Так, цей масив може містити рядки та числа, але також може містити все, що ми туди покладемо, від null до об'єктів. Але ми хочемо, щоб він містив лише рядки чи числа. Саме тут нам на допомогу приходять generics.



// Ми знаємо, що масив це об'єкт Array і хочемо уточнити, які типи до нього можуть входити:



// let arr: Array<string | number> = [];


// Ми вказали, що тип Array складатиметься з рядків та чисел і, тепер, якщо ми передамо туди не той тип, отримаємо помилку.

// let arr: Array<string | number> = [];

// arr = ['str', 10, true];

// export {};




// Розгляньмо ще один приклад, коли використання узагальнених типів стає просто необхідним. Це відбувається, коли ми працюємо з асинхронним кодом. Оскільки Promise може повернути абсолютно все, без дженерика ми ніколи не дізнаємось, що він повертає.



// Створимо Promise, вказавши тип.
const promise: Promise<string> = new Promise((resolve) => {
    setInterval(() => {
      resolve('Done!');
    }, 1000);
  });
  
  promise.then((data) => {
    console.log(data);
  });
  
  export {};





// Всередині 'data' маємо тип 'string'. Якщо ми не вкажемо тип, він буде позначений як 'any'.

// Generic function/method



// Узагальнені функції або методи в TypeScript є способом створення функцій, що можуть працювати з різними типами даних, зберігаючи водночас типізацію вхідних і вихідних даних.



// Давайте подивимося на приклад простої узагальненої функції:



// function identity<T>(arg: T): T {
//   return arg;
// }


// У цій функції T є узагальненим типом. Це означає, що T є певним типом, який буде вказаний при виклику функції. Функція identity приймає аргумент типу T і повертає значення того ж типу T.



// Ми можемо викликати цю функцію для різних типів:



// let output1 = identity<string>("myString"); 
// let output2 = identity<number>(100);


// Також TypeScript може автоматично виводити тип під час використання узагальнених функцій, тому ми можемо опустити явну вказівку типу:



// let output1 = identity("myString"); 
// let output2 = identity(100);


// Generics дуже корисні у роботі з колекціями, промісами та багатьма іншими випадками, коли функція має бути гнучкою за типами даних, але водночас зберігати сувору типізацію.



// Як приклад, давайте розглянемо функцію, що приймає масив та повертає його перший елемент:
function firstElement<T>(arr: T[]): T {
    return arr[0];
  }
  
  let numbers = [1, 2, 3, 4, 5];
  let firstNum = firstElement(numbers);
  
  let strings = ['a', 'b', 'c', 'd'];
  let firstStr = firstElement(strings);
  
  export {};





// У цьому прикладі функція firstElement може працювати з масивами будь-яких типів і завжди повертає елемент того ж типу, що й елементи масиву. Тобто тип T буде замінений на number або string залежно від значень, що передаються.



// Давайте розглянемо хрестоматійний приклад – поєднання двох об'єктів.
function merge(objA: object, objB: object) {
    return Object.assign(objA, objB);
  }
  
  const merged = merge({ name: 'Alisa' }, { age: 28 });
  
  merged.name;
  
  export {};





// Ми отримали помилку на merged.name, тому що TypeScript просто не знає, що міститься в об'єкті.



// Звичайно, ми можемо напряму вказати через 'as' наявність ключів в об'єкті:



// const merged = merge({name: 'Alisa'}, {age: 28}) as {name: string, age: number};


// Але ми отримуємо дуже брудний код, який складно читати та підтримувати. Давайте скористаємося дженерик-типами для вирішення цієї проблеми.



// Як ми знаємо, функція теж є об'єктом, а отже ми можемо вказати для неї дженерик, так само як ми це робили з масивом або промісом.

function merge<T, U>(objA: T, objB: U) {
    return Object.assign(objA, objB);
  }
  
  const merged = merge({ name: 'Alisa' }, { age: 28 });
  
  merged.name;
  
  export {};




// Ми передали два типи T та U, що будуть застосовані до аргументів функції, і тепер у нас немає помилки. Ми отримуємо об'єднаний тип.



// const merged: {
//     name: string;
// } & {
//     age: number;
// }


// Ми також можемо передавати типи під час виклику функції.



type Person = {
    name: string;
  };
  
  type AdditionFields = {
    age: number;
  };
  
  function merge<T, U>(objA: T, objB: U) {
    return Object.assign(objA, objB);
  }
  
  const merged = merge<Person, AdditionFields>({ name: 'Alisa' }, { age: 28 });
  
  merged.name;
  
  export {};
  
// Extends



// У контексті узагальнених типів ключове слово extends використовується для визначення обмежень на типи, які можуть бути використані з узагальненим типом. Це дозволяє нам уточнити, які типи допустимі у наших узагальнених функціях чи класах.



// Повернімося до нашої попередньої функції 'merge'. У ній є проблема: ми можемо передавати не лише об'єкти, а й будь-який інший тип даних, і це не зовсім те, що ми хотіли б бачити.



// const merged = merge({ name: 'Alisa' }, 'TEXT'); // {0: 'T', 1: 'E', 2: 'X', 3: 'T', name: 'Alisa'}


// Ми передали другим аргументом рядок ‘TEXT’ і у нас вийде дивний результат. Ми можемо обмежити тип, використовуючи extends. 

function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
  }
  
  const merged = merge({ name: 'Alisa' }, 'TEXT');
  
  merged.name;
  
  export {};




// Ми зробили:

// T extends object, U extends object


// Це дає нам обмеження, що T та U мають бути об'єктами.



// Розглянемо ще один приклад. У нас є функція, що повертатиме довжину або рядка, або масиву. Ми вирішили використати для цього дженерики:
type Length = {
    length: number;
  };
  
  function getLength<T extends Length>(str: T) {
    return str.length;
  }
  
  getLength('text');
  getLength([1, 2, 3]);
  getLength(100); // Errro: Argument of type 'number' is not assignable to parameter of type 'ILength'
  
  export {};





// Передаючи число в getLength, ми отримуємо помилку, оскільки у нього немає методу length.



// Ще одним прикладом використання extends може бути функція, що приймає масив елементів певного типу:

function arrayLogger<T extends Array<string>>(array: T): void {
    array.forEach((item) => console.log(item));
  }
  
  arrayLogger(['Hello', 'World']); // Ok
  arrayLogger([1, 2, 3]); // Error
  
  export {};
  




// У цьому випадку T extends Array<string> означає, що параметр функції має бути масивом рядків.

// Що робить ключове слово extends в узагальнених типах?

// Підказка

// Воно дозволяє створювати нові типи на основі вже наявних.
// Воно визначає обмеження на типи, які можна використовувати з узагальненим типом.
// Воно дозволяє використовувати один і той самий тип у різних областях видимості.
// Воно дозволяє узагальненому типу наслідувати властивості та методи базового типу.
// Результат

// Правильно! Воно визначає обмеження на типи, які можна використовувати з узагальненим типом.

// keyof



// keyof — це оператор у TypeScript, що повертає типізований набір ключів для заданого типу. Іншими словами, він повертає тип, який представляє всі можливі ключі цього типу.



// Візьмемо, наприклад, наступний тип:



// type Person = {
//   name: string;
//   age: number;
//   location: string;
// };


// Якщо ми використовуємо keyof з цим типом, то отримаємо тип, що представляє всі можливі ключі цього типу:



// type PersonKeys = keyof Person; // 'name' | 'age' | 'location'


// Тепер PersonKeys представляє будь-який ключ з Person. Це може бути корисним у функціях, що приймають об'єкт типу Person і ключ цього об'єкта:
type Person = {
    name: string;
    age: number;
    location: string;
  };
  
  type PersonKeys = keyof Person; // 'name' | 'age' | 'location'
  
  function getPersonInfo(person: Person, key: PersonKeys) {
    return person[key];
  }
  
  const john: Person = {
    name: 'John',
    age: 25,
    location: 'NY',
  };
  
  console.log(getPersonInfo(john, 'age')); // 25
  console.log(getPersonInfo(john, 'name')); // 'John'
  console.log(getPersonInfo(john, 'job')); // Error: Argument of type '"job"' is not assignable to parameter of type 'PersonKeys'.
  
  export {};





// У цьому прикладі getPersonInfo може приймати лише ключі, допустимі для Person. Якби ми спробували передати ключ, якого немає в Person, TypeScript видав би помилку.



// А тепер давайте застосуємо дженерики до цієї концепції з використанням 'keyof'. У нашій практиці, ймовірно, виникне потреба повертати значення з об'єкта. Але навіть якщо ви використовуєте дженерики, ви можете натрапити на помилку.
function extractValue<T extends object, U>(obj: T, key: U) {
    return obj[key]; // Type 'U' cannot be used to index type 'T'
  }
  
  extractValue({ name: 'John' }, 'name');
  
  export {};





// Це відбувається, оскільки TypeScript не може гарантувати, що вказаний ключ дійсно наявний в об'єкті. І тут ми можемо скористатися оператором 'keyof'. Він дозволяє уточнити, що певний тип існує як ключ в об'єкті.
function extractValue<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key];
  }
  
  extractValue({ name: 'John' }, 'name');
  
  export {};





// Тут ми написали:

// T extends object, U extends keyof T 


// Тобто ми скористалися 'extends' для обмеження значень 'U' ключами з об'єкта 'T'.

// Що таке keyof?

// Підказка

// Ключове слово, що повертає всі можливі значення для заданого типу.
// Ключове слово, що повертає всі можливі ключі для заданого типу.
// Ключове слово, що створює новий тип на основі заданого типу.
// Ключове слово, що повертає тип заданого значення.
// Результат

// Правильно! keyof дійсно повертає всі можливі ключі для заданого типу.

// Якого типу будуть значення, які повертає keyof?

// Підказка

// string
// any
// number | string
// string | symbol
// Результат

// keyof у TypeScript повертає тип string | symbol, що відповідає типам ключів в об'єктах JavaScript.

// Generic Classes



// Узагальнені класи в TypeScript дозволяють визначити клас з типами, що можуть бути встановлені під час створення екземпляра класу. Це дозволяє створювати класи, що можуть працювати з різними типами даних, зберігаючи водночас сувору типізацію.

class DataStorage<T> {
    private data: T[] = [];
  
    addItem(item: T) {
      this.data.push(item);
    }
  
    getItems() {
      return [...this.data];
    }
  }
  
  const textStorage = new DataStorage<string>();
  textStorage.addItem('Hello');
  textStorage.addItem('World');
  console.log(textStorage.getItems()); // ['Hello', 'World']
  textStorage.addItem(1); // Error: Argument of type 'number' is not assignable to parameter of type 'string'
  
  const numberStorage = new DataStorage<number>();
  numberStorage.addItem(1);
  numberStorage.addItem(2);
  console.log(numberStorage.getItems()); // [1, 2]
  numberStorage.addItem('TEXT'); // Error: Argument of type 'number' is not assignable to parameter of type 'number'
  
  export {};
  




// У цьому прикладі клас "DataStorage" має узагальнений тип "T", який визначається під час створення екземпляра класу. В результаті ми отримуємо універсальний клас для зберігання даних, що може працювати з рядками, числами або будь-якими іншими типами, які ми визначимо.



// Передаючи туди значення не того типу, ми отримуємо помилку, як:



// textStorage.addItem(1); // Error: Argument of type 'number' is not assignable to parameter of type 'string'

// numberStorage.addItem('TEXT'); // Error: Argument of type 'number' is not assignable to parameter of type 'number'


// Це також корисно для створення класів, що працюють зі спеціалізованими типами. Наприклад, ми можемо визначити клас "KeyValuePair", який приймає два узагальнені типи: один для ключа та один для значення.

class KeyValuePair<TKey, TValue> {
    constructor(private key: TKey, private value: TValue) {}
  
    getKey(): TKey {
      return this.key;
    }
  
    getValue(): TValue {
      return this.value;
    }
  }
  
  const pair1 = new KeyValuePair('name', 'Alice');
  console.log(pair1.getKey()); // 'name'
  console.log(pair1.getValue()); // 'Alice'
  
  const pair2 = new KeyValuePair(1, true);
  console.log(pair2.getKey()); // 1
  console.log(pair2.getValue()); // true
  
  export {};
  




// Таким чином, ми можемо використовувати один і той же клас, який буде працювати з різними типами.

// Як створити узагальнений клас?

// Підказка

// class GenericClass<T> { ... }
// generic class GenericClass<T> { ... }
// class GenericClass<generic T> { ... }
// class GenericClass<T generic> { ... }
// Результат

// Правильно! class GenericClass<T> { ... }

// Якщо у вас є узагальнений клас MyClass<T>, як ви створите екземпляр цього класу, де T це number?

// const instance = new MyClass<number>();
// const instance = new MyClass().<number>;
// const instance = MyClass<number>.new();
// const instance = new MyClass().number;
// Результат

// Правильно! const instance = new MyClass<number>();

// Utility Types



// TypeScript має великий набір утилітних типів, що полегшують життя розробників. Ці типи забезпечують гнучкість у роботі з іншими типами та забезпечують простий та зрозумілий спосіб створення нових типів на основі наявних. Всі ці типи засновані на дженериках та пропонують додаткові можливості для роботи з типами.



// Подивитися більше типів можна в основній документації: https://www.typescriptlang.org/docs/handbook/utility-types.html





// Partial<T>
type User = {
    id: number;
    name: string;
    email: string;
    registered: boolean;
  };
  
  function createUser(data: Partial<User>): User {
    // Деякі значення за замовчуванням:
    const defaultUser: User = {
      id: Date.now(),
      name: '',
      email: '',
      registered: false,
    };
  
    // З'єднуємо дані користувача та значення за замовчуванням
    return { ...defaultUser, ...data };
  }
  
  const newUser = createUser({ name: 'Alice', email: 'alice@example.com' });
  
  console.log(newUser);
  
  export {};


// Утилітний тип Partial<T> створює новий тип на основі типу T, але робить всі його властивості необов'язковими. Це дуже корисно в ситуаціях, коли ви хочете створити об'єкт, заснований на певному типі, але не хочете або не можете вказати значення всіх властивостей відразу.






// У цьому прикладі Partial<User> дозволяє нам створювати користувачів, надаючи лише дані, які відомі на момент створення. Значення за замовчуванням використовуються для інших полів.





// Readonly<T>



// Утилітний тип, що робить усі властивості у типі T тільки для читання. Це означає, що після того, як об'єкт буде створений, його властивості не можна буде змінити.



// Давайте розглянемо приклад із типом User:


type User = {
    id: number;
    name: string;
    email: string;
  };
  
  let alice: User = {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
  };
  
  alice.name = 'Bob'; // OK
  
  let aliceReadonly: Readonly<User> = {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
  };
  
  user.name = 'Bob'; // Error: Cannot assign to 'name' because it is a read-only property.
  
  export {};



// У цьому прикладі ми можемо змінити ім'я користувача alice після його створення. Але оскільки aliceReadonly має тип Readonly<User>, ми отримаємо помилку компіляції.



// Пам'ятаєте, ми створювали тип кортежу? Але метод 'push' все одно працював. Так ось, використовуючи Readonly, можна створити дійсно незмінний масив.
const arr: Readonly<string[]> = ['One', 'Two', 'Three'];

arr.push('Four'); // Error: Property 'push' does not exist on type 'readonly string[]'.

export {};





// Тепер цей масив не можна модифікувати жодним чином.





// Pick<T, K>



// Pick — це утилітний тип у TypeScript, що дозволяє вам обрати набір властивостей з існуючого типу і створити новий тип на основі цих властивостей.



// Розглянемо приклад. У нас є тип User, що містить три властивості: id, name та email. Ми хочемо створити новий тип, що міститиме лише id і name.

type User = {
    id: number;
    name: string;
    email: string;
  };
  
  type UserBasicInfo = Pick<User, 'id' | 'name'>;
  
  let userBasicInfo: UserBasicInfo = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com', // Error: Property 'email' does not exist on type 'UserBasicInfo'
  };
  
  export {};




// Pick дуже корисний, коли ви хочете працювати тільки з певною підмножиною властивостей наявного типу.



// Він часто використовується для складання типів, наприклад, під час роботи з API, звідки може прийти безліч полів. Зазвичай для всіх цих полів вже існує якийсь базовий тип, чи то користувач, сторінка, чи документ, і з допомогою 'Pick' ми вибираємо потрібні для конкретного випадку поля.

type BaseEmployee = {
    id: number;
    firstName: string;
    lastName: string;
    position: string;
    department: string;
    startDate: Date;
    // ...і багато інших полів
  };
  
  type BaseProject = {
    id: number;
    name: string;
    budget: number;
    deadline: Date;
    // ...і багато інших полів
  };
  
  type Assignment = {
    employee: Pick<BaseEmployee, 'id' | 'firstName' | 'lastName'>;
    projects: Pick<BaseProject, 'id' | 'name' | 'deadline'>[];
    shouldNotifyEmployee?: boolean;
  };
  
  export {};




// У цьому прикладі Assignment — це тип, що описує властивості для компонента або функції, що призначає співробітників (BaseEmployee) на проєкти (BaseProject). Для цього використовуються лише деякі поля з BaseEmployee та BaseProject, а не всі.





// Record<K, T>



// Record<K, T> — це утилітний тип, що дозволяє створювати типи із заздалегідь відомими властивостями. Це дуже корисно, коли вам потрібно створити об'єкт із певними ключами та значеннями, типи яких ви заздалегідь знаєте.



// Принцип роботи Record наступний: ви вказуєте набір ключів K і тип T, який буде присвоєно кожному з цих ключів. 



// Ось базовий приклад використання Record:

type Weekdays = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
type Weekend = 'Sat' | 'Sun';

type Day = Weekdays | Weekend;

type DayTranslations = Record<Day, string>;

const translations: DayTranslations = {
  Mon: 'Понеділок',
  Tue: 'Вівторок',
  Wed: 'Середа',
  Thu: 'Четверг',
  Fri: "П'ятниця",
  Sat: 'Субота',
  Sun: 'Неділя',
};

export {};




// У цьому прикладі DayTranslations — це тип об'єкта, ключами якого є значення типу Day, а значеннями – рядки. Отже, ви отримуєте суворо типізований об'єкт перекладу, який гарантує, що кожен день тижня буде перекладено.



// Record часто використовується для мапінгів, перекладів та інших ситуацій, коли вам потрібно створити об'єкт із заздалегідь відомими ключами.



// Ми можемо використовувати enum для цього. Давайте визначимо enum для наших ролей:

enum UserRoles {
    admin = 'admin',
    manager = 'manager',
    employee = 'manager',
  }
  
  type UserRolesStatuses = Record<UserRoles, boolean>;
  
  const userRoleStatuses: UserRolesStatuses = {
    [UserRoles.admin]: true,
    [UserRoles.manager]: false,
    [UserRoles.employee]: true,
  };
  
  export {};




// Тут UserRoles — це перерахування, що визначає можливі ролі користувача. UserRolesStatuses — це тип, що представляє запис, де кожна роль користувача зіставлена з булевим значенням, що вказує на активацію цієї ролі.



// Розглянемо ще один приклад. Припустимо, ми маємо форму з типом 'InitialFormType', і ми хочемо розширити цей тип помилками, які можуть виникнути.

// ​​

type InitialFormType = {
    name: string;
    email: string;
    password: string;
  };
  
  export type Form = InitialFormType & {
    errors: Partial<Record<keyof InitialFormType, [string]>>;
  };
  
  export {};


// Ми визначаємо тип Form, який є об'єднанням InitialFormType та об'єкта, що містить поле errors.



// Keyof InitialFormType отримує всі ключі з InitialFormType (в цьому випадку, це name, email та password), і Record створює новий тип, в якому кожен із цих ключів відображається на масив рядків. Потім Partial робить кожну властивість цього нового типу необов'язковою.





// Omit<T, K>



// Це Pick, але навпаки. Дозволяє створити новий тип на основі типу T шляхом виключення набору властивостей, зазначених у K.



// type Person = {
//   name: string;
//   age: number;
//   location: string;
// };


// Ми можемо створити новий тип 'PersonWithoutLocation', використовуючи 'Omit':



// type PersonWithoutLocation = Omit<Person, 'location'>;


// Тепер 'PersonWithoutLocation' є таким самим типом, як і 'Person', але без властивості 'location'. Це може бути корисно, якщо в деяких контекстах ми не хочемо мати певних властивостей у наших типах.





// ReturnType<T>



// Дозволяє отримати тип функції, що повертається. Для функцій він має використовуватися з typeof.

// Ось простий приклад:

function greeting() {
    return 'Hello, world!';
  }
  
  type Greeting = ReturnType<typeof greeting>; // 'string'
  
  function multiply(a: number, b: number) {
    return a * b;
  }
  
  type MultiplyResult = ReturnType<typeof multiply>; // 'number'
  
  export {};




// Давайте напишемо обгортку для функції, але повертатимемо тип з колбеку. Тут нам не потрібен typeof, тому що TypeScript автоматично виводить типи для T.

type Callback = (...args: unknown[]) => unknown;

function createLoggedFunction<T extends Callback>(func: T) {
  let funcRef = func;

  const loggedFunction = (...args: Parameters<T>) => {
    console.log(`Function ${func.name} was called with arguments:`, args);
    const result = funcRef(...args) as ReturnType<T>;
    return result;
  };

  return loggedFunction;
}

export {};




// Тепер loggedFunction приймає функцію як аргумент і повертає нову функцію, яка всередині себе викликає вихідну функцію. Тип вихідної функції, що повертається, зберігається завдяки використанню ReturnType<T>.





// Parameters<T>



// Витягує типи параметрів типу функції T. Вона повертає кортеж, що містить типи всіх параметрів функції T у тому порядку, в якому вони оголошені.



// type MyFunctionType = (a: string, b: number, c: boolean) => void;

// type MyParametersType = Parameters<MyFunctionType>;
// // Результат: [string, number, boolean]


// У цьому прикладі MyFunctionType представляє тип функції з трьома параметрами: a типу string, b типу number і c типу boolean. Потім ми використовуємо Parameters для отримання типів параметрів цієї функції та привласнюємо результат типу MyParametersType. Результатом буде тип [string, number, boolean], що представляє кортеж із трьох типів параметрів функції.



// Отже, утиліта Parameters дозволяє нам отримати доступ до типів параметрів функції у TypeScript, як ми це зробили в прикладі з ReturnType.





// NonNullable<T>



// Утилітний тип, що приймає тип T та виключає з нього null та undefined. Цей тип корисний, коли ви хочете гарантувати, що значення не буде null чи undefined.



// Ось приклад використання NonNullable:



// type SomeType = string | null | undefined;

// // NonNullableType будет равен 'string'
// type NonNullableType = NonNullable<SomeType>;


// У цьому прикладі SomeType — це тип, який може бути або рядком, або null, або undefined. Під час використання NonNullable<SomeType> ми отримуємо тип NonNullableType, який може бути тільки рядком.

// Припустимо, у вас є такий тип: type User = { id: number; name: string; email: string; }; Який тип буде у змінної, оголошеної так: let userUpdate: Partial<User>;

// Підказка

// { id?: number, name?: string, email?: string }
// { id: number, name: string, email: string }
// { id: number | undefined, name: string | undefined, email: string | undefined }
// Результат

// Partial<User> робить усі властивості у типі User необов'язковими.

// Припустимо, у нас є наступний тип: type Point = { x: number; y: number; }; Ми створюємо новий об'єкт наступним чином: const p1: Readonly<Point> = { x: 10, y: 20 }; Що станеться, якщо ми спробуємо змінити властивості x чи y об'єкта p1?

// Підказка

// TypeScript дозволить змінити властивості x та y.
// TypeScript видасть помилку, кажучи, що властивості x та y доступні тільки для читання.
// Результат

// Правильно! Readonly<Point> робить усі властивості в типі Point доступними тільки для читання.

// type Animal = { id: number; name: string; type: string; age: number; }; const dog: Pick<Animal, 'name' | 'age'> = { name: 'Rex', type: 'Dog', age: 5 }; Що поверне TypeScript?

// Підказка

// Помилку, оскільки type відсутній.
// Помилку, тому що id відсутній в dog.
// Код буде скомпільовано без помилок.
// Помилку, тому що age має бути рядком.
// Результат

// Поверне помилку, тому що type відсутній у Pick<Animal, 'name' | 'age'>.

// Який тип значення матиме такий тип? type ExampleType = { details: Record<'name' | 'age', string>; };

// Підказка

// { details: { name: number; age: number; } }
// { details: { name: string; age: string; } }
// { details: { name: boolean; age: boolean; } }
// { details: { name: any; age: any; } }
// Результат

// Правильно! { details: { name: string; age: string; } }

// Що робить наступний тип? type ErrorType = Partial<Record<keyof InitialFormType, string[]>>;

// Підказка

// Створює тип, у якому всі властивості InitialFormType стають необов'язковими та їхніми значеннями є масиви рядків.
// Створює тип, у якому всі властивості InitialFormType стають обов'язковими та їхніми значеннями є масиви рядків.
// Створює тип, у якому всі властивості InitialFormType стають необов'язковими та їхніми значеннями є рядки.
// Створює тип, у якому всі властивості InitialFormType стають обов'язковими та їхніми значеннями є рядки.
// Результат

// Правильно! Partial<T> робить усі властивості типу T необов'язковими. Тому цей тип робить всі властивості InitialFormType необов'язковими і вказує, що їхніми значеннями є масиви рядків.

// Вітаємо з завершенням ще одного модулю! Далі ми поглибимось у концепції об'єктно-орієнтованого програмування та його застосування в TypeScript.



// Продовжуй розвиватися та впроваджувати отримані знання у своїх проєктах!



// До зустрічі в новому конспекті!


Partial<User> робить усі властивості у типі User необов'язковими.
Readonly<Point> робить усі властивості в типі Point доступними тільки для читання.
Pick — це утилітний тип у TypeScript, що дозволяє вам обрати набір властивостей з існуючого типу і створити новий тип на основі цих властивостей.
Record<K, T> — це утилітний тип, що дозволяє створювати типи із заздалегідь відомими властивостями. Це дуже корисно, коли вам потрібно створити об'єкт із певними ключами та значеннями, типи яких ви заздалегідь знаєте.
Це Pick, але навпаки. Дозволяє створити новий тип на основі типу T шляхом виключення набору властивостей, зазначених у K.
ReturnType<T> Дозволяє отримати тип функції, що повертається. Для функцій він має використовуватися з typeof.
Parameters<T> Витягує типи параметрів типу функції T. Вона повертає кортеж, що містить типи всіх параметрів функції T у тому порядку, в якому вони оголошені.
NonNullable<T> Утилітний тип, що приймає тип T та виключає з нього null та undefined. Цей тип корисний, коли ви хочете гарантувати, що значення не буде null чи undefined.