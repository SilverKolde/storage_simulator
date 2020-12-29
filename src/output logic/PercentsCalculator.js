const PercentsCalculator = {
    /**
     * Returns an array: [
     *      fragmented_files / all_files  %,
     *      fragmented_storage_units_combined / used_storage  %
     * ]
     */
    getPercents(lastRow) {
        let percents = [];
        
        // calculate 'fragmented_files / all_files  %'
        let allFiles = new Set();
        let fragmentedFiles = new Set();
    
        for (let i = 0; i < lastRow.length; i++) {
            const cellValue = lastRow[i];
        
            if (i === 1) {
                allFiles.add(cellValue)
            } else {
                const previousValue = lastRow[i - 1];
                if (cellValue !== previousValue) {
                    if (allFiles.has(cellValue))
                        fragmentedFiles.add(cellValue);
                    else
                        allFiles.add(cellValue);
                }
            }
        }
        fragmentedFiles.delete('-');
        allFiles.delete('-');
        
        let percent1 = Math.round((fragmentedFiles.size / allFiles.size) * 10000) / 100
        percents.push(percent1);
    
        // calculate 'fragmented_storage_units_combined / used_storage  %'
        let allocatedCells = 0;
        let fragmentedCells = 0;
    
        for (let i = 0; i < lastRow.length; i++) {
            const cellValue = lastRow[i];
            if (cellValue !== '-') {
                allocatedCells++;
                if (fragmentedFiles.has(cellValue)) {
                    fragmentedCells++;
                }
            }
        }
    
        let percent2 = Math.round(fragmentedCells / allocatedCells * 10000) / 100
        percents.push(percent2)
    
        return percents
    }
}

module.exports = PercentsCalculator;