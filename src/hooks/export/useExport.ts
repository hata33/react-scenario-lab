"use client";

import { useState, useCallback, useEffect } from 'react';
import { ExportConfig, ExportFormat, ExportProgress, ExportHistory, ExportOptions } from '@/types/export';
import { ExportManager } from '@/services/export/exportManager';

export interface UseExportOptions {
  defaultFilename?: string;
  defaultFormat?: ExportFormat;
  availableFormats?: ExportFormat[];
  autoSaveHistory?: boolean;
}

export interface UseExportReturn {
  // 状态
  exporting: boolean;
  progress: ExportProgress | null;
  history: ExportHistory[];

  // 方法
  export: (config: ExportConfig) => Promise<void>;
  batchExport: (configs: ExportConfig[]) => Promise<void>;
  cancelExport: () => void;
  clearHistory: () => void;
  refreshHistory: () => void;

  // 配置
  setFilename: (filename: string) => void;
  setFormat: (format: ExportFormat) => void;
  setOptions: (options: ExportOptions) => void;
  exportOptions: ExportOptions;

  // 预览
  preview: (data: any, format: ExportFormat) => Promise<string>;

  // 快速导出
  quickExport: (data: any, filename?: string, format?: ExportFormat) => Promise<void>;
}

export function useExport(options: UseExportOptions = {}): UseExportReturn {
  const {
    defaultFilename = 'export',
    defaultFormat = 'txt',
    availableFormats = ['txt', 'csv', 'json', 'xlsx', 'pdf'],
    autoSaveHistory = true
  } = options;

  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState<ExportProgress | null>(null);
  const [history, setHistory] = useState<ExportHistory[]>([]);
  const [filename, setFilename] = useState(defaultFilename);
  const [format, setFormat] = useState<ExportFormat>(defaultFormat);
  const [exportOptions, setExportOptions] = useState<ExportOptions>({});

  const exportManager = ExportManager.getInstance();

  // 加载历史记录
  useEffect(() => {
    if (autoSaveHistory) {
      loadHistory();
    }
  }, [autoSaveHistory]);

  const loadHistory = useCallback(() => {
    try {
      const exportHistory = exportManager.getHistory();
      setHistory(exportHistory);
    } catch (error) {
      console.error('加载导出历史失败:', error);
    }
  }, [exportManager]);

  // 导出功能
  const exportData = useCallback(async (config: ExportConfig) => {
    try {
      setExporting(true);

      // 注册进度回调
      const exportId = `export_${Date.now()}`;
      exportManager.registerProgressCallback(exportId, setProgress);

      await exportManager.export(config);

      // 清理
      exportManager.unregisterProgressCallback(exportId);
      setExporting(false);
      setProgress(null);

      // 刷新历史记录
      if (autoSaveHistory) {
        loadHistory();
      }
    } catch (error) {
      setExporting(false);
      setProgress(null);
      throw error;
    }
  }, [exportManager, autoSaveHistory, loadHistory]);

  // 批量导出
  const batchExportData = useCallback(async (configs: ExportConfig[]) => {
    try {
      setExporting(true);

      // 注册进度回调
      const exportId = `batch_export_${Date.now()}`;
      exportManager.registerProgressCallback(exportId, setProgress);

      await exportManager.batchExport(configs);

      // 清理
      exportManager.unregisterProgressCallback(exportId);
      setExporting(false);
      setProgress(null);

      // 刷新历史记录
      if (autoSaveHistory) {
        loadHistory();
      }
    } catch (error) {
      setExporting(false);
      setProgress(null);
      throw error;
    }
  }, [exportManager, autoSaveHistory, loadHistory]);

  // 取消导出
  const cancelExport = useCallback(() => {
    setExporting(false);
    setProgress(null);
  }, []);

  // 清除历史记录
  const clearHistory = useCallback(() => {
    exportManager.clearHistory();
    setHistory([]);
  }, [exportManager]);

  // 刷新历史记录
  const refreshHistory = useCallback(() => {
    loadHistory();
  }, [loadHistory]);

  // 预览功能
  const previewData = useCallback(async (data: any, previewFormat: ExportFormat): Promise<string> => {
    try {
      switch (previewFormat) {
        case 'txt':
          return JSON.stringify(data, null, 2).substring(0, 1000);
        case 'csv':
          if (Array.isArray(data) && data.length > 0) {
            const headers = Object.keys(data[0]);
            const sampleRow = data[0];
            return headers.join(',') + '\n' + headers.map(h => sampleRow[h]).join(',');
          }
          return 'No data available';
        case 'json':
          return JSON.stringify(data, null, 2).substring(0, 1000);
        case 'xml':
          return '<?xml version="1.0" encoding="UTF-8"?>\n<data>\n  ' +
                 JSON.stringify(data, null, 2).substring(0, 800) + '\n</data>';
        case 'markdown':
          if (Array.isArray(data) && data.length > 0) {
            const headers = Object.keys(data[0]);
            return '| ' + headers.join(' | ') + ' |\n' +
                   '|' + headers.map(() => '---').join('|') + '|\n' +
                   '| ' + headers.map(h => data[0][h]).join(' | ') + ' |';
          }
          return '# Preview\n\nNo data available';
        default:
          return 'Preview not available for this format';
      }
    } catch (error) {
      console.error('生成预览失败:', error);
      return 'Preview generation failed';
    }
  }, []);

  // 快速导出方法
  const quickExport = useCallback((data: any, customFilename?: string, customFormat?: ExportFormat) => {
    const config: ExportConfig = {
      filename: customFilename || filename,
      format: customFormat || format,
      data,
      options: exportOptions
    };
    return exportData(config);
  }, [exportData, filename, format, exportOptions]);

  return {
    // 状态
    exporting,
    progress,
    history,

    // 方法
    export: exportData,
    batchExport: batchExportData,
    cancelExport,
    clearHistory,
    refreshHistory,

    // 配置
    setFilename,
    setFormat,
    setOptions: setExportOptions,
    exportOptions,

    // 预览
    preview: previewData,

    // 快速导出
    quickExport
  };
}

// 便捷导出Hook
export function useQuickExport<T = any>(data: T, options?: UseExportOptions) {
  const exportHook = useExport(options);

  const quickExportFn = useCallback((filename?: string, format?: ExportFormat) => {
    return exportHook.export({
      filename: filename || options?.defaultFilename || 'export',
      format: format || options?.defaultFormat || 'txt',
      data
    });
  }, [exportHook, data, options]);

  return {
    ...exportHook,
    export: quickExportFn
  };
}

// 批量导出Hook
export function useBatchExport(options?: UseExportOptions) {
  const exportHook = useExport(options);

  const exportBatch = useCallback((datasets: Array<{ data: any; filename: string; format?: ExportFormat }>) => {
    const configs: ExportConfig[] = datasets.map(dataset => ({
      filename: dataset.filename,
      format: dataset.format || options?.defaultFormat || 'txt',
      data: dataset.data,
      options: exportHook.exportOptions
    }));

    return exportHook.batchExport(configs);
  }, [exportHook, options]);

  return {
    ...exportHook,
    exportBatch
  };
}