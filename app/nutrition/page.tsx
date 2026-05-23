'use client';

import { useState } from 'react';

interface Meal {
  name: string;
  calories: number;
}

interface NutritionPlan {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  meals: { [key: string]: Meal[] };
}

const nutritionPlans: { [key: string]: NutritionPlan } = {
  'Weight Loss': {
    name: 'Weight Loss',
    calories: 1800,
    protein: 150,
    carbs: 180,
    fats: 60,
    meals: {
      'Breakfast': [
        { name: 'Egg White Omelet (2 whites)', calories: 70 },
        { name: 'Whole Wheat Toast', calories: 80 },
        { name: 'Fresh Berries', calories: 60 },
      ],
      'Mid-Morning Snack': [
        { name: 'Greek Yogurt (0% fat)', calories: 100 },
        { name: 'Almonds (1oz)', calories: 160 },
      ],
      'Lunch': [
        { name: 'Grilled Chicken Breast (4oz)', calories: 185 },
        { name: 'Brown Rice (1/2 cup)', calories: 110 },
        { name: 'Broccoli (steamed)', calories: 35 },
      ],
      'Afternoon Snack': [
        { name: 'Protein Shake', calories: 120 },
        { name: 'Apple', calories: 95 },
      ],
      'Dinner': [
        { name: 'Salmon (3oz)', calories: 155 },
        { name: 'Sweet Potato (5oz)', calories: 103 },
        { name: 'Green Salad', calories: 50 },
      ],
      'Evening Snack': [
        { name: 'Cottage Cheese (1/2 cup)', calories: 110 },
      ],
    }
  },
  'Muscle Gain': {
    name: 'Muscle Gain',
    calories: 3000,
    protein: 200,
    carbs: 350,
    fats: 100,
    meals: {
      'Breakfast': [
        { name: 'Whole Eggs (3)', calories: 210 },
        { name: 'Oatmeal (1 cup cooked)', calories: 150 },
        { name: 'Banana', calories: 105 },
        { name: 'Peanut Butter (2 tbsp)', calories: 190 },
      ],
      'Mid-Morning Snack': [
        { name: 'Protein Shake with Milk', calories: 350 },
        { name: 'Granola Bar', calories: 200 },
      ],
      'Lunch': [
        { name: 'Chicken Breast (6oz)', calories: 280 },
        { name: 'White Rice (1 cup cooked)', calories: 205 },
        { name: 'Olive Oil (1 tbsp)', calories: 120 },
      ],
      'Pre-Workout Snack': [
        { name: 'Rice Cakes with Jam', calories: 220 },
      ],
      'Dinner': [
        { name: 'Ground Beef (6oz)', calories: 360 },
        { name: 'Sweet Potato (1 large)', calories: 150 },
        { name: 'Broccoli', calories: 35 },
      ],
      'Evening Shake': [
        { name: 'Casein Protein', calories: 200 },
        { name: 'Milk (full-fat)', calories: 150 },
      ],
    }
  },
  'Balanced': {
    name: 'Balanced',
    calories: 2200,
    protein: 110,
    carbs: 275,
    fats: 73,
    meals: {
      'Breakfast': [
        { name: 'Scrambled Eggs (2)', calories: 140 },
        { name: 'Whole Wheat Bread (2 slices)', calories: 160 },
        { name: 'Butter (1 tsp)', calories: 45 },
        { name: 'Orange Juice', calories: 110 },
      ],
      'Mid-Morning Snack': [
        { name: 'Greek Yogurt', calories: 130 },
        { name: 'Granola', calories: 150 },
      ],
      'Lunch': [
        { name: 'Turkey Sandwich (2oz)', calories: 140 },
        { name: 'Whole Wheat Bread', calories: 80 },
        { name: 'Lettuce & Tomato', calories: 30 },
        { name: 'Cheese (1 slice)', calories: 110 },
        { name: 'Apple', calories: 95 },
      ],
      'Afternoon Snack': [
        { name: 'Almonds (1oz)', calories: 160 },
        { name: 'Banana', calories: 105 },
      ],
      'Dinner': [
        { name: 'Salmon (4oz)', calories: 206 },
        { name: 'Quinoa (1/2 cup cooked)', calories: 111 },
        { name: 'Roasted Vegetables', calories: 75 },
      ],
      'Evening Snack': [
        { name: 'Herbal Tea', calories: 0 },
      ],
    }
  },
  'Vegan': {
    name: 'Vegan',
    calories: 2000,
    protein: 60,
    carbs: 300,
    fats: 67,
    meals: {
      'Breakfast': [
        { name: 'Oatmeal (1 cup cooked)', calories: 150 },
        { name: 'Almond Milk (1 cup)', calories: 30 },
        { name: 'Berries (1 cup)', calories: 85 },
        { name: 'Ground Flax (2 tbsp)', calories: 150 },
      ],
      'Mid-Morning Snack': [
        { name: 'Hummus (1/4 cup)', calories: 100 },
        { name: 'Vegetable Sticks', calories: 50 },
      ],
      'Lunch': [
        { name: 'Tofu (4oz)', calories: 88 },
        { name: 'Brown Rice (1 cup cooked)', calories: 215 },
        { name: 'Stir-fried Vegetables', calories: 80 },
        { name: 'Coconut Oil (1 tbsp)', calories: 120 },
      ],
      'Afternoon Snack': [
        { name: 'Peanut Butter (2 tbsp)', calories: 190 },
        { name: 'Apple', calories: 95 },
      ],
      'Dinner': [
        { name: 'Lentil Curry (1.5 cups)', calories: 270 },
        { name: 'Basmati Rice (1/2 cup cooked)', calories: 108 },
        { name: 'Spinach Salad', calories: 50 },
      ],
      'Evening Snack': [
        { name: 'Plant-based Protein Shake', calories: 120 },
      ],
    }
  }
};

export default function NutritionPage() {
  const [selectedPlan, setSelectedPlan] = useState('Balanced');
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [customization, setCustomization] = useState({
    dairyFree: false,
    glutenFree: false,
    vegan: false,
    keto: false,
  });

  const plan = nutritionPlans[selectedPlan];
  const mealColors = ['#FFB6C1', '#87CEEB', '#FFD700', '#90EE90', '#DDA0DD', '#F0E68C'];

  const toggleMeal = (mealName: string) => {
    setSelectedMeals(prev =>
      prev.includes(mealName)
        ? prev.filter(m => m !== mealName)
        : [...prev, mealName]
      );
  };

  const toggleCustomization = (key: keyof typeof customization) => {
    setCustomization(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const selectedMealNames = selectedMeals.length > 0 ? selectedMeals : Object.keys(plan.meals);
  const totalCalories = selectedMealNames.reduce((sum, mealName) => {
    return sum + plan.meals[mealName].reduce((mealSum, meal) => mealSum + meal.calories, 0);
  }, 0);

  const customizationText = Object.entries(customization)
    .filter(([_, value]) => value)
    .map(([key, _]) => key.replace(/([A-Z])/g, ' $1').trim())
    .join(', ');

  return (
    <main style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
    }}>
      <h2 style={{ marginBottom: '2rem' }}>🍎 Nutrition & Meal Plans</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem',
        marginBottom: '2rem',
      }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Select Your Plan</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
            marginBottom: '2rem',
          }}>
            {Object.keys(nutritionPlans).map((plan) => (
              <button
                key={plan}
                onClick={() => setSelectedPlan(plan)}
                style={{
                  padding: '1rem',
                  backgroundColor: selectedPlan === plan ? '#7C3AED' : '#f0f0f0',
                  color: selectedPlan === plan ? '#fff' : '#333',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s',
                }}
              >
                {plan}
              </button>
            ))}
          </div>

          <h3 style={{ marginBottom: '1rem' }}>Customization Options</h3>
          <div style={{
            backgroundColor: '#fff',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}>
            {Object.entries(customization).map(([key, value]) => (
              <label
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => toggleCustomization(key as keyof typeof customization)}
                />
                {key === 'dairyFree' && '🥛 Dairy-Free'}
                {key === 'glutenFree' && '🌾 Gluten-Free'}
                {key === 'vegan' && '🌱 Vegan'}
                {key === 'keto' && '🥑 Keto'}
              </label>
            ))}
            {customizationText && (
              <p style={{ color: '#7C3AED', marginTop: '1rem', fontWeight: 'bold' }}>
                ✓ {customizationText} selected
              </p>
            )}
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Daily Macros</h3>
          <div style={{
            backgroundColor: '#fff',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1.5rem',
              borderBottom: '2px solid #eee',
            }}>
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>Total Calories</p>
              <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#7C3AED' }}>
                {Math.round(totalCalories)}
              </p>
              <p style={{ color: '#999', fontSize: '0.85rem' }}>Goal: {plan.calories}</p>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
              }}>
                <span style={{ fontWeight: 'bold', color: '#FF6B6B' }}>Protein</span>
                <span>{plan.protein}g</span>
              </div>
              <div style={{
                backgroundColor: '#FFE0E0',
                height: '8px',
                borderRadius: '4px',
                overflow: 'hidden',
              }}>
                <div style={{
                  backgroundColor: '#FF6B6B',
                  height: '100%',
                  width: '70%',
                }}></div>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
              }}>
                <span style={{ fontWeight: 'bold', color: '#F9A825' }}>Carbs</span>
                <span>{plan.carbs}g</span>
              </div>
              <div style={{
                backgroundColor: '#FFE8C1',
                height: '8px',
                borderRadius: '4px',
                overflow: 'hidden',
              }}>
                <div style={{
                  backgroundColor: '#F9A825',
                  height: '100%',
                  width: '65%',
                }}></div>
              </div>
            </div>

            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
              }}>
                <span style={{ fontWeight: 'bold', color: '#4ECDC4' }}>Fats</span>
                <span>{plan.fats}g</span>
              </div>
              <div style={{
                backgroundColor: '#D0F5F2',
                height: '8px',
                borderRadius: '4px',
                overflow: 'hidden',
              }}>
                <div style={{
                  backgroundColor: '#4ECDC4',
                  height: '100%',
                  width: '60%',
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: '1rem' }}>Daily Meals</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
      }}>
        {Object.entries(plan.meals).map(([mealName, meals], index) => (
          <div
            key={mealName}
            onClick={() => toggleMeal(mealName)}
            style={{
              backgroundColor: mealColors[index % mealColors.length],
              padding: '1.5rem',
              borderRadius: '0.75rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'all 0.3s',
              opacity: selectedMeals.length === 0 || selectedMeals.includes(mealName) ? 1 : 0.5,
              border: selectedMeals.includes(mealName) ? '2px solid #7C3AED' : '2px solid transparent',
            }}
          >
            <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
              {selectedMeals.includes(mealName) ? '✓ ' : ''}{mealName}
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              marginBottom: '1rem',
            }}>
              {meals.map((meal, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.9rem',
                }}>
                  <span>{meal.name}</span>
                  <span style={{ fontWeight: 'bold' }}>{meal.calories} cal</span>
                </div>
              ))}
            </div>
            <div style={{
              borderTop: '2px solid rgba(0,0,0,0.2)',
              paddingTop: '0.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 'bold',
            }}>
              <span>Total:</span>
              <span>{meals.reduce((sum, meal) => sum + meal.calories, 0)} cal</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
