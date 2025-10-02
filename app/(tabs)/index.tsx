import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handlePress = (value: string) => {
    if (value === '=') {
      try {
        setResult(eval(input).toString()); // Note: eval is used for simplicity. Avoid it in production.
      } catch {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else {
      setInput((prev) => prev + value);
    }
  };

  const renderButton = (label: string) => (
    <TouchableOpacity
      key={label}
      style={styles.button}
      onPress={() => handlePress(label)}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
    ['C']
  ];

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.input}>{input}</Text>
        <Text style={styles.result}>{result}</Text>
      </View>
      {buttons.map((row, index) => (
        <View key={index} style={styles.row}>
          {row.map(renderButton)}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 16,
    justifyContent: 'flex-end',
  },
  display: {
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  input: {
    color: '#fff',
    fontSize: 36,
  },
  result: {
    color: '#aaa',
    fontSize: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#333',
    flex: 1,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
});
