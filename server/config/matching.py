import sys
import json
import numpy as np
from kmodes.kprototypes import KPrototypes  # Read data from stdins

# Get the JSON string argument
json_data = sys.argv[1]

# Parse the JSON string back into an array of objects
data = json.loads(json_data)

# Do something with the data
result = []
for obj in data:
    result.append({
        'name': obj['name'],
        'age_squared': obj['age'] ** 2
    })

# Serialize the result data as a JSON string and print it
json_result = json.dumps(data)
# print(json_result)
