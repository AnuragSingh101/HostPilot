// models/sshSessionModel.js
import mongoose from 'mongoose';

const sshSessionSchema = new mongoose.Schema({
  session_id: {
    type: String,
    required: true,
    unique: true
  },
  server: {
    ip: {
      type: String,
      required: true
    },
    port: {
      type: Number,
      default: 22
    },
    hostname: {
      type: String
    },
    type: {
      type: String,
      enum: ['linux', 'windows'],
      default: 'linux'
    }
  },
  auth: {
    method: {
      type: String,
      enum: ['password', 'key'],
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: function () {
        return this.auth.method === 'password';
      }
    },
    privateKey: {
      type: String,
      required: function () {
        return this.auth.method === 'key';
      }
    },
    passphrase: {
      type: String
    }
  },
  options: {
    terminalType: {
      type: String,
      default: 'xterm'
    },
    windowSize: {
      cols: {
        type: Number,
        default: 80
      },
      rows: {
        type: Number,
        default: 24
      }
    },
    env: {
      type: Map,
      of: String,
      default: { LANG: 'en_US.UTF-8' }
    },
    compression: {
      type: Boolean,
      default: false
    }
  },
  status: {
    type: String,
    enum: ['active', 'ended', 'failed'],
    default: 'active'
  },
  error: {
    type: String,
    default: null
  },
  timeout: {
    type: Number,
    default: 600
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date,
    default: null
  },
  createdBy: {
    type: String,
    required: true
  }
});

// 👇 Export properly using ES modules
const SshSession = mongoose.model('SshSession', sshSessionSchema);
export default SshSession;
