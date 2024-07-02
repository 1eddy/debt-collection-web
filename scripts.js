async function fetchData() {
    try {
        const response = await fetch('/api');
        const data = await response.json();
        console.log('Debt Items:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function addItem(id, description, amount) {
    try {
        const response = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, description, amount })
        });
        const newItem = await response.json();
        console.log('Added Item:', newItem);
    } catch (error) {
        console.error('Error adding item:', error);
    }
}

// Call fetchData to fetch items when the script loads
fetchData();
