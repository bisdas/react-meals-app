const tasksTimeAllocations = [1, 4, 1, 3, 1];

const getSumFromIndex = (arr, startIndex) => {
    const sum = arr.reduce((acc, currentElement, currentIndex) => {
        if (currentIndex >= startIndex) {
            acc += currentElement;
        }

        return acc;
    }, 0);

    return sum;
}

const getSumTillIndex = (arr, lastIndex) => {
    const sum = arr.reduce((acc, currentElement, currentIndex) => {
        if (currentIndex <= lastIndex) {
            acc += currentElement;
        }

        return acc;
    }, 0);

    return sum;
}


const getOptimalBreakTime = (tasks) => {
    for (let index = 0; index < tasks.length; index++) {
        if (getSumTillIndex(tasks, index) === getSumFromIndex(tasks, index + 1)) {
            return index;
        }
    }

    return null;
}


console.log(getOptimalBreakTime(tasksTimeAllocations));