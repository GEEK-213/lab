/**
 * Extract sustainability score from AI response text
 * @param {string} text - AI response text
 * @returns {number} - Score between 0-100, defaults to 50 if not found
 */
export function extractScore(text) {
  if (!text || typeof text !== 'string') {
    return 50; // Default score
  }

  // Pattern 1: Look for "score: 85" or "score is 85"
  const scorePattern1 = /score[:\s]+is?\s*(\d{1,3})/i;
  const match1 = text.match(scorePattern1);
  if (match1) {
    const score = parseInt(match1[1], 10);
    if (score >= 0 && score <= 100) {
      return score;
    }
  }

  // Pattern 2: Look for "85/100" format
  const scorePattern2 = /(\d{1,3})\s*\/\s*100/i;
  const match2 = text.match(scorePattern2);
  if (match2) {
    const score = parseInt(match2[1], 10);
    if (score >= 0 && score <= 100) {
      return score;
    }
  }

  // Pattern 3: Look for "eco-friendliness score: 85"
  const scorePattern3 = /eco-friendliness\s+score[:\s]+(\d{1,3})/i;
  const match3 = text.match(scorePattern3);
  if (match3) {
    const score = parseInt(match3[1], 10);
    if (score >= 0 && score <= 100) {
      return score;
    }
  }

  // Pattern 4: Look for standalone numbers between 0-100
  // This is less reliable, so we try it last
  const numbers = text.match(/\b(\d{1,2}|100)\b/g);
  if (numbers) {
    for (const numStr of numbers) {
      const num = parseInt(numStr, 10);
      if (num >= 0 && num <= 100) {
        // Check if it's in a context that suggests it's a score
        const context = text.toLowerCase();
        const index = context.indexOf(numStr);
        const before = context.substring(Math.max(0, index - 20), index);
        const after = context.substring(index + numStr.length, index + numStr.length + 20);
        
        if (
          before.includes('score') ||
          after.includes('score') ||
          before.includes('rating') ||
          after.includes('rating')
        ) {
          return num;
        }
      }
    }
  }

  // Default fallback
  return 50;
}

/**
 * Parse structured recommendations from AI response
 * @param {string} text - AI response text
 * @returns {Array<Object>} - Array of recommendation objects
 */
export function parseRecommendations(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const recommendations = [];
  const lines = text.split('\n').filter(line => line.trim());

  let currentRecommendation = null;

  for (const line of lines) {
    const trimmed = line.trim();
    
    // Check if line looks like a recommendation title (starts with number, bullet, or is bold)
    if (
      /^\d+[\.\)]/.test(trimmed) ||
      /^[-*•]/.test(trimmed) ||
      /^[A-Z][^.!?]*:/.test(trimmed)
    ) {
      // Save previous recommendation if exists
      if (currentRecommendation) {
        recommendations.push(currentRecommendation);
      }
      
      // Start new recommendation
      currentRecommendation = {
        title: trimmed.replace(/^\d+[\.\)]\s*/, '').replace(/^[-*•]\s*/, ''),
        description: '',
      };
    } else if (currentRecommendation && trimmed.length > 0) {
      // Add to description
      currentRecommendation.description += (currentRecommendation.description ? ' ' : '') + trimmed;
    }
  }

  // Add last recommendation
  if (currentRecommendation) {
    recommendations.push(currentRecommendation);
  }

  return recommendations;
}

/**
 * Get grade from score
 * @param {number} score - Score between 0-100
 * @returns {string} - Grade (A, B, C, or D)
 */
export function getGrade(score) {
  if (score >= 85) return 'A';
  if (score >= 70) return 'B';
  if (score >= 50) return 'C';
  return 'D';
}

/**
 * Get grade color classes
 * @param {string} grade - Grade letter
 * @returns {string} - Tailwind CSS classes
 */
export function getGradeColor(grade) {
  const colors = {
    A: 'bg-[#13ec6d] text-[#102218]',
    B: 'bg-blue-400 text-black',
    C: 'bg-yellow-400 text-black',
    D: 'bg-red-400 text-black',
  };
  return colors[grade] || colors.D;
}
