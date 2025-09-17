import { Loader2 } from 'lucide-react';

interface CourseActionsProps {
  onSubmit: () => void
  onCancel: () => void
  isLoading: boolean
}

export default function CourseActions({ onSubmit, onCancel, isLoading }: CourseActionsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
          className="px-8 py-3 bg-green-600 text-white font-medium rounded-full hover:bg-green-700
           transition-colors disabled:opacity-50 disabled:cursor-not-allowed 
           flex items-center justify-center cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Updating Course...
            </>
          ) : (
            "Update Course"
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50
           transition-colors disabled:opacity-50 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}