// components/editor/DebugInfo.tsx
import React from 'react';
import type { DebugInfoProps } from '@/lib/types'; // Adjust path

export const DebugInfo: React.FC<DebugInfoProps> = ({
  syncStatus,
  syncError,
  onGetManualToken,
  manualTokenStatus,
  manualTokenError,
  manualToken,
  decodedManualToken
}) => (
   <div>
     <h2 className="text-xl font-semibold mb-4">Debugging & Status</h2>
      {/* Automatic Sync Status Section */}
      <div className="p-4 border border-dashed border-gray-300 rounded-md bg-gray-50 mb-4">
          {/* ... content ... */}
          <h3 className="text-lg font-semibold mb-2">Automatic Backend Sync</h3>
          <p>Status: <strong className="capitalize">{syncStatus}</strong></p>
          {syncStatus === 'syncing' && <p className="mt-1 text-blue-600">Syncing user data...</p>}
          {syncStatus === 'synced' && <p className="mt-1 text-green-600">Sync process completed.</p>}
          {syncStatus === 'error' && <p className="mt-1 text-red-600 font-semibold">Sync Error: {syncError}</p>}
      </div>
      {/* Manual Token Fetch Section */}
      <div className="p-4 border border-dashed border-indigo-200 rounded-md bg-indigo-50 flex flex-col gap-4">
           {/* ... content ... */}
          <h3 className="text-lg font-semibold">Manual Token Inspection</h3>
          <button
              onClick={onGetManualToken}
              disabled={manualTokenStatus === 'fetching'}
              className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium self-start hover:bg-blue-700 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 text-sm"
          >
              {manualTokenStatus === 'fetching' ? 'Fetching...' : 'Get JWT Token'}
          </button>
          {manualTokenStatus === 'error' && !manualTokenError?.includes('decode') && (
             <p className="mt-1 text-red-600 font-semibold text-sm">Error fetching token: {manualTokenError}</p>
          )}
          {manualTokenStatus === 'success' && manualToken && (
            <div className="mt-2 flex flex-col gap-2">
              {manualTokenError && manualTokenError.includes('decode') && (
                <p className="text-orange-600 font-semibold text-sm">{manualTokenError}</p>
              )}
              <div>
                 <h4 className="text-md font-semibold mb-1">Raw JWT Token:</h4>
                 <textarea value={manualToken} readOnly rows={4} className="w-full p-2 text-xs font-mono border border-gray-300 rounded-md break-all bg-white"/>
              </div>
              <div>
                 <h4 className="text-md font-semibold mb-1">Decoded Payload:</h4>
                 {decodedManualToken ? (
                   <pre className="w-full p-2 text-xs font-mono border border-gray-300 rounded-md break-all whitespace-pre-wrap bg-white overflow-auto max-h-40">
                     {JSON.stringify(decodedManualToken, null, 2)}
                   </pre>
                 ) : !manualTokenError?.includes('decode') ? (
                    <p className="text-gray-500 text-sm">Could not decode token payload.</p>
                 ) : null }
              </div>
            </div>
          )}
           {manualTokenStatus === 'success' && !manualToken && (
             <p className="mt-1 text-red-600 font-semibold text-sm">Token fetch succeeded but token value is missing.</p>
          )}
      </div>
  </div>
);