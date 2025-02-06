// Define a TypeScript interface
type Person = {
	age: number
	name: string
}

// Create an array of objects with the defined interface
const people: Person[] = [
	{ age: 30, name: 'Alice' },
	{ age: 25, name: 'Bob' },
	{ age: 35, name: 'Charlie' },
]

const { log } = console

// Use a for...of loop to iterate over the array
for (const person of people) {
	log(`Hello, my name is ${person.name} and I am ${person.age} years old.`)
}

// Define a generic function
function identity<T>(arg: T): T {
	return arg
}

// Use the generic function with type inference
const result = identity('TypeScript is awesome')
log(result)

// Use optional properties in an interface
type Car = {
	make: string
	model?: string
}

// Create objects using the interface
const car1: Car = { make: 'Toyota' }
const car2: Car = {
	make: 'Ford',
	model: 'Focus',
}

// Use union types
type Fruit = 'apple' | 'banana' | 'orange'
const favoriteFruit: Fruit = 'apple'

// Define a class with access modifiers
class Animal {
	constructor(private readonly name: string) {}
	protected makeSound(sound: string) {
		log(`${this.name} says ${sound}`)
	}
}

// Extend a class
class Dog extends Animal {
	bark() {
		this.makeSound('Woof!')
	}
}

const dog = new Dog('Buddy')
dog.bark()

const fn = (): string => 'hello' + 1

const numericValue = 1

log(car1, car2, favoriteFruit, numericValue, fn())

export {}
