import { ref } from 'vue';
import { useUserInfo } from './useUserInfo';
import api from '@/utils/axios';

export const useCalculator = () => {
  const display = ref('');
  const operatorInserted = ref(false);
  const { username, setBalance } = useUserInfo();
  const isLoading = ref(false);  // Add loading state

  const append = (value) => {
    if (['+', '-', '*', '/'].includes(value)) {
      if (operatorInserted.value) return;
      operatorInserted.value = true;
    }
    display.value += value;
  };

  const clear = () => {
    display.value = '';
    operatorInserted.value = false;
  };

  const backspace = () => {
    if (['+', '-', '*', '/'].includes(display.value.slice(-1))) {
      operatorInserted.value = false;
    }
    display.value = display.value.slice(0, -1);
  };

  const generateRandomString = async () => {
    try {
      display.value = 'Loading...';  // Show loading state in display
      const userId = username.value;
      
      const response = await api.post('/random-string', {
        userId: userId
      });

      const result = response.data;
      
      if (result.result !== undefined) {
        display.value = result.result;
        
        // Update balance if provided in response
        if (result.remaining_balance !== undefined) {
          setBalance(result.remaining_balance.toString());
        }
      } else {
        display.value = 'Error';
      }
    } catch (error) {
      console.error('Random string generation error:', error);
      display.value = 'Error';
    }
  };

  const sqrt = async () => {
    try {
      const userId = username.value;
      const number = parseFloat(display.value);
      display.value = 'Loading...';

      if (isNaN(number)) {
        display.value = 'Error';
        return;
      }

      const response = await api.post('/square-root', {
        num1: number,
        user_id: userId,
      });

      const result = response.data;
      display.value = result.result !== undefined ? result.result.toString() : 'Error';

      if (result.remaining_balance !== undefined) {
        setBalance(result.remaining_balance.toString());
      }
    } catch (error) {
      console.error('Square root error:', error);
      display.value = 'Error';
    }
  };

  const calculate = async () => {
    const operatorMatch = display.value.match(/(\d+\.?\d*)([+\-*/])(\d+\.?\d*)/);
    if (!operatorMatch) {
      display.value = 'Error';
      return;
    }

    try {
      display.value = 'Loading...';
      const [, num1, operator, num2] = operatorMatch;
      const userId = username.value;
      let endpoint = '';

      switch (operator) {
        case '+':
          endpoint = '/addition';
          break;
        case '-':
          endpoint = '/substraction';
          break;
        case '*':
          endpoint = '/multiplication';
          break;
        case '/':
          endpoint = '/division';
          break;
        default:
          display.value = 'Error';
          return;
      }

      const response = await api.post(endpoint, {
        num1: parseFloat(num1),
        num2: parseFloat(num2),
        user_id: userId,
      });

      const result = response.data;
      display.value = result.result !== undefined ? result.result.toString() : 'Error';

      if (result.remaining_balance !== undefined) {
        setBalance(result.remaining_balance.toString());
      }
    } catch (error) {
      console.error('Calculation error:', error);
      display.value = 'Error';
    }
  };

  const handleButtonClick = async (value) => {
    switch (value) {
      case 'C':
        clear();
        break;
      case '⌫':
        backspace();
        break;
      case '=':
        await calculate();
        break;
      case '√':
        await sqrt();
        break;
      case 'RND':
        await generateRandomString();
        break;
      case '÷':
        append('/');
        break;
      case '×':
        append('*');
        break;
      case '−':
        append('-');
        break;
      default:
        append(value);
    }
  };

  return {
    display,
    handleButtonClick,
    isLoading, // Export loading state if needed elsewhere
  };
};