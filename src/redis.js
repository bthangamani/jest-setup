import Redis from 'ioredis';

Redis.Promise = Promise;
const redis = new Redis({
    "host": "127.0.0.2",
    "db": 0,
    "port": 6379
});

const logErrorEvent = (err) => {
    if (err.code === 'ENOTFOUND') {
        throw err;
    }
    console.error('Redis Error', err);
};

redis.on('error', logErrorEvent);
// Handling connection events
redis.on('connect', () => {
    console.log('Connected to Redis');
});

const _set = (key, value, ttl) => redis.set(key, value, 'ex', ttl);

// Setting and getting values
(async () => {
    try {
        // Set a key-value pair
        await redis.set('myKey', 'Hello, Redis!');

        // Get the value for a key
        const value = await redis.get('myKey');
        console.log('Value retrieved from Redis:', value);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close the connection
        redis.quit();
    }
})();

export default {
    get: (key) => redis.get(key),
    setDup: (key, ttl) => _set(key, true, ttl),
    setPaidType: (key, ttl) => _set(key, true, ttl),
    del: (key) => redis.del(key),
    logErrorEvent
};
