"use client";

import { useState } from "react";
import { parseAIImport, validateImport, ImportType, QUOTATION_PROMPT, INVOICE_PROMPT } from "@/lib/aiImport";
import { Sparkles, AlertTriangle, CheckCircle, X, Copy } from "lucide-react";

interface AIImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  expectedType: ImportType;
  onImportSuccess: (parsedData: any, warnings: string[]) => void;
}

export default function AIImportModal({
  isOpen,
  onClose,
  expectedType,
  onImportSuccess,
}: AIImportModalProps) {
  const [jsonText, setJsonText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const promptText = expectedType === "quotation" ? QUOTATION_PROMPT : INVOICE_PROMPT;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(promptText);
    setToastMessage("AI prompt copied. Paste it into your preferred AI and describe your quotation or invoice.");
    setTimeout(() => setToastMessage(null), 4000);
  };

  if (!isOpen) return null;

  const handleAutoFill = () => {
    setError(null);

    // 1. Safe parsing
    const { data, error: parseError } = parseAIImport(jsonText);
    if (parseError) {
      setError(parseError);
      return;
    }

    // 2. Schema and type validation
    const validation = validateImport(data, expectedType);
    if (!validation.isValid) {
      setError(validation.error || "Validation failed.");
      return;
    }

    // 3. Callback to parent component with mapped data
    onImportSuccess(data, validation.warnings);
    setJsonText("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-500/75 transition-opacity dark:bg-gray-950/80" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Center alignment trick */}
        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

        {/* Modal content panel */}
        <div className="relative z-10 inline-block transform overflow-hidden rounded-xl bg-white text-left align-bottom shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:align-middle dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
              Import from AI
            </h3>
            <button 
              type="button" 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form / Content */}
          <div className="px-6 py-4 space-y-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Paste your AI-generated JSON response below. The CRM will automatically map and autofill the fields, add the appropriate rows, and run the calculation engine.
            </p>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3.5 flex items-start gap-2.5 dark:bg-red-950/20 dark:border-red-900/30">
                <AlertTriangle className="w-5 h-5 text-red-650 flex-shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Textarea Label and Action */}
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">AI Response JSON</span>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="text-xs font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                View AI Prompt
              </button>
            </div>

            {/* Textarea */}
            <div>
              <label className="sr-only">AI JSON input</label>
              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder="Paste AI JSON here..."
                rows={12}
                className="w-full rounded-lg border-gray-300 text-xs font-mono p-3 bg-gray-50 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-white px-4 py-2 text-xs font-bold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-700 dark:hover:bg-gray-750"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAutoFill}
              className="rounded-md bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Auto Fill
            </button>
          </div>
        </div>
      </div>

      {/* Sibling Prompt Preview Dialog */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-60 overflow-y-auto flex items-center justify-center p-4">
          {/* Sibling Backdrop */}
          <div className="fixed inset-0 bg-gray-500/50 dark:bg-gray-950/70" onClick={() => setIsPreviewOpen(false)}></div>
          
          <div className="relative transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 max-w-lg w-full z-10">
            <h4 className="text-sm font-bold text-gray-950 dark:text-white mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-500" />
              Copy AI Prompt Preview
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Here is the exact prompt configured for this form. Use the copy button to copy it.
            </p>

            <pre className="text-xxs font-mono bg-gray-50 dark:bg-gray-950 text-gray-700 dark:text-gray-300 p-4 rounded-lg overflow-y-auto max-h-72 border border-gray-150 dark:border-gray-850 whitespace-pre-wrap select-all">
              {promptText}
            </pre>

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="rounded-md bg-white px-4 py-2 text-xs font-bold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-700 dark:hover:bg-gray-750 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-500 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Prompt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide-in Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-70 max-w-sm rounded-lg bg-gray-900 text-white text-xs py-3 px-4 shadow-xl flex items-center gap-2 border border-gray-800 dark:bg-white dark:text-gray-900 dark:border-gray-200 transition-all duration-300 animate-slide-in">
          <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
