import { Injectable } from '@nestjs/common';
import { RuleOperator } from '../common/constants/enums';

export interface Rule {
  field: string;
  operator: RuleOperator;
  value: any;
}

@Injectable()
export class RuleEngineService {
  /**
   * Evaluates a rule against a set of data (usually user answers).
   * @param rule The rule to evaluate
   * @param data The data to evaluate against (e.g., { experience: 5 })
   */
  evaluate(rule: Rule, data: Record<string, any>): boolean {
    const { field, operator, value: targetValue } = rule;
    const actualValue = data[field];

    if (actualValue === undefined) return false;

    switch (operator) {
      case RuleOperator.EQUALS:
        return actualValue === targetValue;
      case RuleOperator.NOT_EQUALS:
        return actualValue !== targetValue;
      case RuleOperator.CONTAINS:
        if (typeof actualValue === 'string' || Array.isArray(actualValue)) {
          return actualValue.includes(targetValue);
        }
        return false;
      case RuleOperator.IN:
        if (Array.isArray(targetValue)) {
          return targetValue.includes(actualValue);
        }
        return false;
      case RuleOperator.GREATER_THAN:
        return actualValue > targetValue;
      case RuleOperator.LESS_THAN:
        return actualValue < targetValue;
      default:
        return false;
    }
  }

  /**
   * Evaluates multiple rules (AND logic by default).
   */
  evaluateAll(rules: Rule[], data: Record<string, any>): boolean {
    if (!rules || rules.length === 0) return true;
    return rules.every(rule => this.evaluate(rule, data));
  }
}
