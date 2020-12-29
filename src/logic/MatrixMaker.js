const MatrixMaker = {
    getResult(files) {
        let matrix = [];
        let n = (files === undefined) ? 9 : files.length;
    
        // loop step by step
        for (let i = 0; i < n; i++) {
            const file = files[i].split(","); // ["A", "2"] and so on
        
            // name of the file
            const name = file[0];
        
            // size of the file
            let size = file[1];
            let removingFile = false;
            if (size.charAt(0) === '-') {
                removingFile = true;
                size = size.substring(1, size.length);
            } else if (size.charAt(0) === '+') {
                size = size.substring(1, size.length);
            }
            size = parseInt(size);
        
            // each row has 48 elements (disk has 48 units)
            let currentRow = [];
            if (i === 0) {
                // fill in the first row
                for (let j = 0; j < 48; j++) {
                    if (j < size) currentRow.push(name);
                    else currentRow.push("-");
                }
                // copy the previous row (and modify where needed)
            } else {
                const previousRow = matrix[i - 1];
                for (let j = 0; j < 48; j++) {
                    if (removingFile) {
                        const letter = (previousRow[j] === name) ? '-' : previousRow[j];
                        currentRow.push(letter);
                    } else if (size > 0 && previousRow[j] === '-') {
                        if (size > 48 - j) {
                            matrix.push('Out of storage!')
                            return matrix;
                        }
                        currentRow.push(name);
                        size--;
                    } else {
                        currentRow.push(previousRow[j]);
                    }
                }
            }
            // push formed row to matrix
            matrix.push(currentRow);
        }
        return matrix;
    }
}

module.exports = MatrixMaker;