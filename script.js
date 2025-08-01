document.getElementById('downloadButton').addEventListener('click', function() {
    const instagramLink = document.getElementById('instagramLink').value;
    const resultDiv = document.getElementById('result');

    if (instagramLink) {
        resultDiv.innerHTML = '<p>ഡൗൺലോഡ് ചെയ്യാൻ ശ്രമിക്കുന്നു...</p>';
        // ഇവിടെയാണ് പ്രധാന ലോജിക് വരുന്നത്.
        // ഈ ഭാഗം ഒരു ബാക്കെൻഡ് സെർവറുമായി (Node.js/Python) ആശയവിനിമയം നടത്തണം.
        // ബാക്കെൻഡ് സെർവർ ഇൻസ്റ്റാഗ്രാം ലിങ്ക് പ്രോസസ്സ് ചെയ്ത് ഡൗൺലോഡ് ലിങ്ക് നൽകണം.

        // ഉദാഹരണത്തിന് (ഇതൊരു പൂർണ്ണമായ കോഡ് അല്ല):
        fetch('/download', { // നിങ്ങളുടെ ബാക്കെൻഡ് API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ link: instagramLink })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success && data.downloadUrl) {
                resultDiv.innerHTML = `<p>ഇവിടെ ക്ലിക്ക് ചെയ്ത് ഡൗൺലോഡ് ചെയ്യുക: <a href="${data.downloadUrl}" download>ഡൗൺലോഡ്</a></p>`;
            } else {
                resultDiv.innerHTML = '<p>ഡൗൺലോഡ് ചെയ്യാൻ കഴിഞ്ഞില്ല. ലിങ്ക് ശരിയാണോ എന്ന് പരിശോധിക്കുക.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = '<p>ഒരു പ്രശ്നം സംഭവിച്ചു. പിന്നീട് ശ്രമിക്കുക.</p>';
        });

    } else {
        resultDiv.innerHTML = '<p>ദയവായി ഒരു ഇൻസ്റ്റാഗ്രാം ലിങ്ക് നൽകുക.</p>';
    }
});