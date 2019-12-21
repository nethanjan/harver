const { getRandomWordSync, getRandomWord } = require('word-maker');
const fs = require('fs');

// task one
// print 1 to 100 with random words including error handling
async function taskOne() {
  let result = '';
  for (let i = 1; i <= 100; i += 1) {
    let randomWord;
    try {
      randomWord = getRandomWordSync({ withErrors: true });
    } catch (e) {
      randomWord = "It shouldn't break anything!";
    }
    if (i === 100) {
      result += `${i}: ${randomWord}`;
    } else {
      result += `${i}: ${randomWord}\n`;
    }
  }
  await writeToFile('taskOneOutput.txt', result);
  console.log('Task One output written into taskOneOutput.txt');
}

// task two
// print 1 to 100 with random words including error handling
// replace random word given words for multiples of 3 & 5
async function taskTwo() {
  let result = '';
  for (let i = 1; i <= 100; i += 1) {
    let randomWord;
    try {
      randomWord = getRandomWordSync({ withErrors: true });
      if (i % 3 === 0 && i % 5 === 0) {
        randomWord = 'FizzBuzz';
      } else if (i % 3 === 0) {
        randomWord = 'Fizz';
      } else if (i % 5 === 0) {
        randomWord = 'Buzz';
      }
    } catch (e) {
      randomWord = "It shouldn't break anything!";
    }
    if (i === 100) {
      result += `${i}: ${randomWord}`;
    } else {
      result += `${i}: ${randomWord}\n`;
    }
  }
  await writeToFile('taskTwoOutput.txt', result);
  console.log('Task Two output written into taskTwoOutput.txt');
}

// task three
// async : print 1 to 100 with random words including error handling
async function taskOneAsync() {
  let result = '';
  for (let i = 1; i <= 100; i += 1) {
    let randomWord;
    try {
      randomWord = await getRandomWord({ withErrors: true });
    } catch (e) {
      randomWord = "It shouldn't break anything!";
    }
    if (i === 100) {
      result += `${i}: ${randomWord}`;
    } else {
      result += `${i}: ${randomWord}\n`;
    }
  }
  await writeToFile('taskOneAsyncOutput.txt', result);
  console.log('Task One Async output written into taskOneAsyncOutput.txt');
}

// task two
// async : print 1 to 100 with random words including error handling
// replace random word given words for multiples of 3 & 5
async function taskTwoAsync() {
  let result = '';
  for (let i = 1; i <= 100; i += 1) {
    let randomWord;
    try {
      randomWord = await getRandomWord({ withErrors: true });
      if (i % 3 === 0 && i % 5 === 0) {
        randomWord = 'FizzBuzz';
      } else if (i % 3 === 0) {
        randomWord = 'Fizz';
      } else if (i % 5 === 0) {
        randomWord = 'Buzz';
      }
    } catch (e) {
      randomWord = "It shouldn't break anything!";
    }
    if (i === 100) {
      result += `${i}: ${randomWord}`;
    } else {
      result += `${i}: ${randomWord}\n`;
    }
  }
  await writeToFile('taskTwoAsyncOutput.txt', result);
  console.log('Task One Async output written into taskTwoAsyncOutput.txt');
}

// task optimized
// print 1 to 100 with random words including error handling
// replace random word given words for multiples of 3 & 5
// random word generator is slowed
async function taskOneOptimized() {
  const start = new Date();
  const promises = [];
  for (let i = 1; i <= 100; i += 1) {
    promises.push(
      getRandomWord({ slow: true, withErrors: true }).catch(() => {
        return 'error'; //
      })
    );
  }
  const allPromisesResolved = await Promise.all(promises).then(result => {
    let response = '';
    result.forEach(function(randomWord, index) {
      let printingWord = randomWord;
      if (randomWord === 'error') {
        // returned error string instead throwing exception to map with index
        printingWord = "It shouldn't break anything!";
      } else {
        if ((index + 1) % 3 === 0 && (index + 1) % 5 === 0) {
          printingWord = 'FizzBuzz';
        } else if ((index + 1) % 3 === 0) {
          printingWord = 'Fizz';
        } else if ((index + 1) % 5 === 0) {
          printingWord = 'Buzz';
        }
      }
      if (index + 1 === 100) {
        response += `${index + 1}: ${printingWord}`;
      } else {
        response += `${index + 1}: ${printingWord}\n`;
      }
      //   console.log(`${index + 1}: ${printingWord}`);
    });
    return response;
  });

  if (allPromisesResolved) {
    await writeToFile('optimizedOutput.txt', allPromisesResolved);
    console.log('Optimized output written into optimizedOutput.txt');
    const end = new Date() - start;
    console.info('Execution time: %dms', end);
  }
}

async function writeToFile(fileName, content) {
  fs.appendFile(fileName, content, err => {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });
}

taskOne();
taskTwo();
taskOneAsync();
taskTwoAsync();
taskOneOptimized();
