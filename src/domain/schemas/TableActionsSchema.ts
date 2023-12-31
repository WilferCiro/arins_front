export interface TableActionsSchema<T> {
  onAdd?: (data: T) => Promise<boolean>;
  onEdit?: (data: T, original: T) => Promise<boolean>;
  onDelete?: (data: T) => Promise<boolean>;
  onDisable?: (data: T) => Promise<boolean>;
  onExport?: (filters: Record<string, string> | undefined) => Promise<boolean>;
}
