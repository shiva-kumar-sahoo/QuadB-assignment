import React from "react";

function Footer() {
  return (
    <div className="bg-gray-200 dark:bg-gray-900 py-4">
      <hr />
      <div className="flex justify-between px-8 mt-2">
        <div className="flex items-center justify-between gap-4">
          <div className="text-gray-800 dark:text-gray-400">
            Copyright © 2019
          </div>
          <div className="text-gray-800 dark:text-gray-400">HodlInfo.com</div>
        </div>

        <div className="ml-auto">
          <a
            href="mailto:support@hodlinfo.com"
            className="text-gray-800 dark:text-gray-400 hover:text-teal-400"
          >
            Support
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
