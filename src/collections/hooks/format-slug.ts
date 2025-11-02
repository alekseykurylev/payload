import type { FieldHook } from 'payload'
import { slugify } from 'transliteration'

const format = (val: string): string => slugify(val, { lowercase: true, separator: '-' })

export const formatSlug =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === 'string' && value.trim() !== '') {
      return format(value)
    }

    if (operation === 'update' || operation === 'create') {
      const fallbackData = data?.[fallback] || originalDoc?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return format(fallbackData)
      }
    }

    return value
  }
